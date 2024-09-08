declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: { [key: string]: any }
    ) => void
  }
}

export {} // This ensures the file is treated as a module
