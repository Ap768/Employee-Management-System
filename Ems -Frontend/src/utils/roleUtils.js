export function normalizeRole(role) {
    if (role === null || role === undefined) {
        return "";
    }

    return String(role)
        .trim()
        .toUpperCase()
        .replace(/^ROLE_/, "");
}

export function hasAdminAccess(role) {
    return normalizeRole(role) === "ADMIN";
}

export function hasManagementAccess(role) {
    const normalizedRole = normalizeRole(role);
    return normalizedRole === "ADMIN" || normalizedRole === "HR";
}
