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
    if (caches) {
      // Clear Service Worker cache
      caches.keys().then(keys => {
        keys.forEach(name => {
          caches.delete(name);
        });
      });
    }
    // Delete browser cache and hard reload
    window.location.reload(true);
  }
}
