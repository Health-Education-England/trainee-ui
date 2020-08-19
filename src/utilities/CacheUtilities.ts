export class CacheUtilities {
  public static SemverGreaterThan(
    latestVersion: string,
    currentVersion: string
  ) {
    if (
      typeof latestVersion === "string" &&
      typeof currentVersion === "string"
    ) {
      const latestV = latestVersion.split(/\./g);
      const currentV = currentVersion.split(/\./g);
      while (latestV.length || currentV.length) {
        const a = Number(latestV.shift());
        const b = Number(currentV.shift());
        if (a === b) continue;
        return a > b || isNaN(b);
      }
    } else return false;
    return false;
  }

  public static RefreshCacheAndReload() {
    // Unregister Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then(registrations => {
          registrations.forEach(registration => registration.unregister());
        })
        .catch(error => console.log(error));
    }
    // Clear Service Worker cache
    if ("caches" in window) {
      caches
        .keys()
        .then(keys => {
          keys.forEach(name => caches.delete(name));
        })
        .catch(error => console.log(error));
    }
    // Delete browser cache and hard reload
    window.location.reload(true);
  }
}
