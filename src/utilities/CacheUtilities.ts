export class CacheUtilities {
  public static SemverGreaterThan(
    latestVersion: string,
    currentVersion: string
  ): boolean {
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

  public static async UnregisterServiceWorker(): Promise<null | undefined> {
    try {
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        registrations.forEach(registration => registration.unregister());
      }
    } catch (error) {
      return null;
    }
  }

  public static async ClearCaches(): Promise<null | undefined> {
    try {
      if ("caches" in window) {
        const keys: string[] = await caches.keys();
        keys.forEach(async name => await caches.delete(name));
      }
    } catch (error) {
      return null;
    }
  }

  public static async ReloadPage(): Promise<null | undefined> {
    try {
      window.location.reload();
    } catch (error) {
      return null;
    }
  }

  public static async FetchMetaFile(): Promise<string | null> {
    try {
      const response = await fetch("/meta.json");
      const meta = await response.json();
      return meta.version;
    } catch (error) {
      return null;
    }
  }
}
