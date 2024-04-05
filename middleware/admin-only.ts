export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return; //Only run middleware on client

  const user = useUserStore();

  if (!user.isAdmin) {
    return navigateTo("/");
  }

  // Avoid infinite redirect loops
  if (!to.path.startsWith("/admin")) {
    return to.fullPath;
  }
});
