<script setup lang="ts">
import { ref, watch, toRefs } from 'vue';
import * as yup from 'yup';

interface ValidationHelperProps {
  values: Record<string, any>;
  schema: yup.ObjectSchema<any>;
    setFieldError: any
}

// Helper function to deep clone objects
const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));

const props = defineProps<ValidationHelperProps>();
//@ts-ignore
const { values, schema, setFieldError } = toRefs(props);

const previousValues = ref(deepClone(values.value));

// Function to validate a single field using yup
const validateField = async (fieldName: string, value: any, context = {}) => {
  try {
    const fieldSchema = yup.reach(schema.value, fieldName);
    //@ts-ignore
    await fieldSchema.validate(value, { context :{ ...context} });
    setFieldError.value(fieldName, '');
    return true;
  } catch (error: any) {
    setFieldError.value(fieldName, error.message);
    return false;
  }
};

// Watch for changes in `values` and validate changed fields
watch(
  values,
  (newValues: Record<string, any>) => {
    const oldValues = deepClone(previousValues.value);

    const changedFields = Object.keys(newValues).filter(
      (key) => newValues[key] !== oldValues[key]
    );

    previousValues.value = deepClone(newValues);

    for (const field of changedFields) {
      validateField(field, newValues[field],newValues);
    }
  },
  { deep: true }
);
</script>
