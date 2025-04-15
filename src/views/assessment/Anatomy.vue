<template>
    <v-app>
      <v-main class="pa-0 ma-0">
        <div class="fill-height position-relative background">
          <!-- Animated background elements -->
          <div class="bg-circles">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
            <div class="circle circle-3"></div>
          </div>
  
          <v-container>
            <v-row class='ml-0 mr-0'  justify="center">
              <h3 class="gradient-text mt-8 mb-6 text-center">Please select the body part that you want to improve</h3>
            </v-row>
          </v-container>
  
          <div class="anatomy-wrapper">
            <div class="floating-controls">
             
              <v-btn
                class="view-btn ma-2"
                :class="{ active: side === 'F' }"
                @click="changeside('F')"
                variant="text"
              >
                Front View
              </v-btn>
              <v-btn
                class="view-btn ma-2" 
                :class="{ active: side === 'B' }"
                @click="changeside('B')"
                variant="text"
              >
                Back View
              </v-btn>
            </div>
  
           
  
            <div
              class="anatomy"
              @mousedown="startMouseDrag"
              @mouseup="stopMouseDrag"
              @mousemove="mouseDrag"
              @touchstart="startTouch"
              @touchend="stopTouch"
              @touchmove="handleTouch"
              :style="{ transform: `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)` }"
            >
              <AnatomySvg
                :side="side"
                :is-view-mode="isViewMode"
                :height="height"
                :selected-parts="selectedParts"
                @selectPart="selectPart"
              />
            </div>
          </div>
  
          <!-- Desktop-only selected parts container -->
          <div v-if="selectedParts.length" class="selected-parts-container">
            <div class="selected-parts-card">
              <h5 class="selected-title mb-4">Selected Body Parts:</h5>
              <div class="selected-parts-list">
                <v-chip
                  v-for="(part, index) in selectedParts"
                  :key="index"
                  class="selected-part-chip ma-1"
                >
                  {{ formattedPart(part) }}
                </v-chip>
              </div>
            </div>
          </div>
        </div>
        <div class="action-button">
              <v-btn
                @click="viewRecomendations"
                block 
            height="56" 
            rounded="pill" 
            class="next-button text-h6 text-white"
            :readonly="selectedParts.length"
              >
                Continue
                <v-icon right class="ml-2">mdi-arrow-right-circle</v-icon>
              </v-btn>
            </div>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick, watch } from 'vue';
  import AnatomySvg from '@/components/assessment/AnatomySVG.vue';
  import Swal from 'sweetalert2';
  import { useRoute, useRouter } from 'vue-router';
  const router = useRouter();

  // Props
  defineProps({
    anatomyDetails: {
      type: Object,
      required: true,
      default: () => ({
        side: 'F',
        zoomLevel: 1,
        isDragging: false,
        lastMouseX: 0,
        lastMouseY: 0,
        translateX: 0,
        translateY: 0,
        selectedParts: [],
        selectedHip: '',
      }),
    },
    isViewMode: {
      type: Boolean,
      default: false,
    },
  });
  
  // Emits
  const emit = defineEmits(['next-step']);
  
  // Reactive state
  const side = ref('F');
  const zoomLevel = ref(1);
  const isDragging = ref(false);
  const lastMouseX = ref(0);
  const lastMouseY = ref(0);
  const translateX = ref(0);
  const translateY = ref(0);
  const selectedParts = ref([]);
  const height = ref('65vh');
  const selectedHip = ref('');
  const startX = ref(0);
  const startY = ref(0);
  const initialDistance = ref(null);
  const startZoomLevel = ref(1);
  
  // Initialize with anatomyDetails
//   onMounted(() => {
//     if (anatomyDetails.value) {
//       side.value = anatomyDetails.value.side;
//       zoomLevel.value = anatomyDetails.value.zoomLevel;
//       isDragging.value = anatomyDetails.value.isDragging;
//       lastMouseX.value = anatomyDetails.value.lastMouseX;
//       lastMouseY.value = anatomyDetails.value.lastMouseY;
//       translateX.value = anatomyDetails.value.translateX;
//       translateY.value = anatomyDetails.value.translateY;
//       selectedParts.value = anatomyDetails.value.selectedParts;
//       selectedHip.value = anatomyDetails.value.selectedHip;
//     }
  
//     // Prevent default touchmove when dragging
//     document.addEventListener(
//       'touchmove',
//       (e) => {
//         if (isDragging.value) {
//           e.preventDefault();
//         }
//       },
//       { passive: false }
//     );
  
//     // Apply initial selected parts styles
//     nextTick(() => {
//       if (anatomyDetails.value?.selectedParts?.length) {
//         anatomyDetails.value.selectedParts.forEach((pathId) => {
//           const clickedPath = document.getElementById(pathId);
//           if (clickedPath) {
//             clickedPath.setAttribute('fill-opacity', '0.7');
//             clickedPath.style.fillOpacity = '0.7';
//             clickedPath.style.fill = '#e94976';
//           }
//         });
//       }
//     });
//   });
  
  // Methods
  const selectPart = async (event) => {
    const pathId = event.target.id;
    const allowedParts = ['shoulder', 'elbow', 'lower_back', 'hip', 'glutes', 'knee'];
    const isAllowed = allowedParts.find((part) => pathId.includes(part));
  
    if (!isViewMode && !isAllowed) {
      await nextTick();
      Swal.fire({
        title: 'Coming soon!',
        icon: 'info',
        background: '#1E1E1E',
        color: '#FFFFFF',
        confirmButtonColor: '#e94976',
        confirmButtonText: 'OK',
      });
    } else if (!isViewMode && isAllowed) {
      const paths = Array.from(
        document.querySelectorAll('[id^="m_frt_"], [id^="f_frt_"], [id^="m_bck_"], [id^="f_bck_"]')
      );
  
      // Reset fill-opacity for non-selected paths
      paths.forEach((path) => {
        if (!selectedParts.value.includes(path.id)) {
          const fillOpacity = path.getAttribute('fill-opacity');
          const styleOpacity = path.style.fillOpacity;
          if (fillOpacity === '0.7' || styleOpacity === '0.7') {
            path.setAttribute('fill-opacity', '0.2');
            path.style.fillOpacity = '0.2';
            path.setAttribute('fill', '#6c6cde');
            path.style.fill = '#6c6cde';
          }
        }
      });
  
      const clickedPath = document.getElementById(pathId);
      if (!selectedParts.value.includes(pathId)) {
        clickedPath.setAttribute('fill-opacity', '0.7');
        clickedPath.style.fillOpacity = '0.7';
        clickedPath.style.fill = '#e94976';
  
        if (isAllowed === 'hip') {
          const result = await Swal.fire({
            title: 'Please Select Hip Area',
            html: '<span style="color: #FFFFFF">Choose the affected side</span>',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Left',
            denyButtonText: 'Both',
            cancelButtonText: 'Right',
            background: '#1E1E1E',
            color: '#FFFFFF',
            confirmButtonColor: '#f06543',
            denyButtonColor: '#6c6cde',
            cancelButtonColor: '#e94976',
            iconHtml: '<i class="v-icon mdi mdi-help-circle" style="color:#f8a465"></i>',
          });
  
          if (result.isConfirmed) {
            selectedHip.value = ['left_hip'];
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            selectedHip.value = ['right_hip'];
          } else if (result.isDenied) {
            selectedHip.value = ['left_hip', 'right_hip'];
          }
        }
        selectedParts.value.push(pathId);
      } else {
        clickedPath.setAttribute('fill-opacity', '0.2');
        clickedPath.style.fillOpacity = '0.2';
        clickedPath.style.fill = '#6c6cde';
        selectedParts.value = selectedParts.value.filter((part) => part !== pathId);
      }
    }
  };
  
  const changeside = (newSide) => {
    if (!isViewMode) {
      side.value = newSide;
      nextTick(() => {
        resetSelection();
      });
    }
  };
  
  const zoomIn = () => {
    zoomLevel.value += 0.2;
  };
  
  const zoomOut = () => {
    if (zoomLevel.value > 0.2) {
      zoomLevel.value -= 0.2;
    }
  };
  
  const startMouseDrag = (event) => {
    isDragging.value = true;
    startX.value = event.clientX;
    startY.value = event.clientY;
  };
  
  const mouseDrag = (event) => {
    if (!isDragging.value) return;
  
    const deltaX = event.clientX - startX.value;
    const deltaY = event.clientY - startY.value;
  
    translateX.value += deltaX;
    translateY.value += deltaY;
  
    startX.value = event.clientX;
    startY.value = event.clientY;
  };
  
  const stopMouseDrag = () => {
    isDragging.value = false;
  };
  
  const resetSelection = () => {
    const anatomyDiv = document.querySelector('.anatomy');
    const paths = Array.from(anatomyDiv.querySelectorAll('*'));
    paths.forEach((path) => {
      if (!selectedParts.value.includes(path.id)) {
        path.setAttribute('fill-opacity', '0.2');
        path.style.fillOpacity = '0.2';
        path.style.fill = '#6c6cde';
      }
    });
  };
  
  const startTouch = (event) => {
    if (event.touches.length === 1) {
      isDragging.value = true;
      startX.value = event.touches[0].clientX;
      startY.value = event.touches[0].clientY;
    } else if (event.touches.length === 2) {
      isDragging.value = false;
      startZoomLevel.value = zoomLevel.value;
      initialDistance.value = getDistance(event.touches);
    }
  };
  
  const handleTouch = (event) => {
    if (event.touches.length === 1 && isDragging.value) {
      event.preventDefault();
      const deltaX = event.touches[0].clientX - startX.value;
      const deltaY = event.touches[0].clientY - startY.value;
  
      translateX.value += deltaX;
      translateY.value += deltaY;
  
      startX.value = event.touches[0].clientX;
      startY.value = event.touches[0].clientY;
    } else if (event.touches.length === 2) {
      event.preventDefault();
      const newDistance = getDistance(event.touches);
      const scaleChange = newDistance / initialDistance.value;
  
      zoomLevel.value = Math.max(0.5, Math.min(3, startZoomLevel.value * scaleChange));
    }
  };
  
  const stopTouch = () => {
    isDragging.value = false;
    initialDistance.value = null;
  };
  
  const getDistance = (touches) => {
    const deltaX = touches[1].clientX - touches[0].clientX;
    const deltaY = touches[1].clientY - touches[0].clientY;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };
  
  const viewRecomendations = () => {
    router.push({ name: 'Questionary', params: { stepname : 'reason' } });
  };
  
  const formattedPart = (part) => {
    if (part === 'hip') {
      part = selectedHip.value ? selectedHip.value.join(', ') : 'hip';
    }
    return part
      .replace(/^m_|^f_/, '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  </script>
  
  <style scoped lang="scss">
  .background {
    position: relative;
    background-color: #121212;
    min-height: 100vh;
    overflow: hidden;
  }
  
  .action-button {
    width: 100%;
    position: fixed;
    bottom: 20px;
    padding: 0 24px 20px;
    z-index: 5;
  }
  
  .next-button {
  background: linear-gradient(to right, #f06543, #e94976) !important;
  font-weight: 500 !important;
  color: white
}

  /* Animated background elements */
  .bg-circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
  }
  
  .circle {
    position: absolute;
    border-radius: 50%;
    opacity: 0.08;
  }
  
  .circle-1 {
    background: linear-gradient(45deg, #f8a465, #e94976);
    width: 500px;
    height: 500px;
    top: -200px;
    right: -100px;
    animation: float 20s infinite alternate ease-in-out;
  }
  
  .circle-2 {
    background: linear-gradient(135deg, #6c6cde, #e94976);
    width: 400px;
    height: 400px;
    bottom: -150px;
    left: -150px;
    animation: float 15s infinite alternate-reverse ease-in-out;
  }
  
  .circle-3 {
    background: linear-gradient(225deg, #f06543, #6c6cde);
    width: 300px;
    height: 300px;
    top: 50%;
    left: 70%;
    animation: float 25s infinite alternate ease-in-out;
  }
  
  @keyframes float {
    0% { transform: translate(0, 0) rotate(0deg); }
    100% { transform: translate(30px, 30px) rotate(10deg); }
  }
  
  .gradient-text {
    background: linear-gradient(to right, #f8a465, #e94976);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 2.5rem;
    font-weight: bold;
    letter-spacing: -0.5px;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .anatomy-wrapper {
    overflow: hidden;
    position: relative;
    height: 70vh;
    margin: 0 16px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);
    z-index: 2;
    min-height: 600px;
    margin-bottom: 400px
  }
  
  .anatomy {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: grab;
    user-select: none;
  }
  
  .anatomy:active {
    cursor: grabbing;
  }
  
  .floating-controls {
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
  }
  
  .control-btn {
    background-color: rgba(108, 108, 222, 0.2) !important;
    border-radius: 50% !important;
    backdrop-filter: blur(5px);
    margin: 4px !important;
    height: 40px !important;
    width: 40px !important;
    transition: all 0.3s ease;
  }
  
  .control-btn:hover {
    background-color: rgba(108, 108, 222, 0.3) !important;
    transform: scale(1.05);
  }
  
  .view-btn {
    color: rgba(255, 255, 255, 0.7) !important;
    border-radius: 20px !important;
    font-weight: 500;
    transition: all 0.3s ease;
    padding: 0 16px !important;
    height: 40px !important;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .view-btn.active {
    background: linear-gradient(to right, #f06543, #e94976) !important;
    color: white !important;
  }
  
  .view-btn:hover:not(.active) {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
  
  
  .continue-btn {
    background: linear-gradient(to right, #f06543, #e94976) !important;
    color: white !important;
    font-weight: 500;
  }
  
  .continue-btn:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(233, 73, 118, 0.4);
  }
  
  .selected-parts-container {
    margin: 20px 16px;
    z-index: 2;
    position: relative;
  }
  
  .selected-parts-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 20px;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .selected-title {
    color: white;
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 16px;
  }
  
  .selected-parts-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .selected-part-chip {
    background: linear-gradient(to right, rgba(108, 108, 222, 0.2), rgba(233, 73, 118, 0.2)) !important;
    color: white !important;
    border: 1px solid rgba(233, 73, 118, 0.3) !important;
    font-weight: 500;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .floating-controls {
      top: 10px;
      left: 0px;
    }
    
    .continue-btn-container {
      top: auto;
      bottom: 16px;
      right: 16px;
    }
    
    .gradient-text {
      font-size: 1.8rem;
    }
    
    .view-btn {
      font-size: 0.8rem;
      padding: 0 12px !important;
    }
  }
  </style>