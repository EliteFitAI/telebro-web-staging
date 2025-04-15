export const PERMISSIONS = Object.freeze({
    DASHBOARD: 'dashboard',
    LIBRARY: 'elitefit_library',
    VIDEO: {
        VIEW: 'view_videos',
        EDIT: 'edit_videos',
        UPLOAD: 'upload_videos',
        DELETE: 'delete_videos',
        ANY: ['view_videos', 'edit_videos', 'upload_videos', 'delete_videos']
    },
    PROGRAM: {
        VIEW: 'view_programs',
        CREATE: 'create_programs',
        EDIT: 'edit_programs',
        DELETE: 'delete_programs',
        ANY: ['view_programs', 'create_programs', 'edit_programs', 'delete_programs']
    },
    USER: {
        VIEW: 'view_users',
        ADD: 'add_users',
        ARCHIVE: 'archive_users',
        EDIT: 'edit_users',
        ANY: ['view_users', 'add_users', 'archive_users', 'edit_users']
    },
    ADMINS: {
        VIEW: 'view_admins',
        ADD: 'add_admins',
        ARCHIVE: 'archive_admins',
        EDIT: 'edit_admins',
        ANY: ['view_admins', 'add_admins', 'archive_admins', 'edit_admins'],
    },
    TEAM: {
        VIEW: 'view_teams',
        ADD: 'add_teams',
        EDIT: 'edit_teams',
        DELETE: 'delete_teams',
        INVITE_USER: 'invite_user_in_team',
        ANY: ['view_teams', 'add_teams', 'archive_teams', 'delete_teams', 'invite_user_in_team'],
    },
    ANALYTICS: {
        VIEW: 'view_reports',
    }
})
