export interface UserDetail {
    id:           string;
    username:     string;
    email:        string;
    first_name:   string;
    last_name:    string;
    is_staff:     boolean;
    is_superuser: boolean;
    is_active:    boolean;
}