import * as CryptoJS from 'crypto-js' // Assuming you have installed the necessary type definitions

export interface DecryptionParams {
  encryptedData: string
  encryptedAESKey: string
  iv: string
}

export function decryptData(params: DecryptionParams): string {
  const { encryptedData, encryptedAESKey, iv } = params

  const privateKey = process.env.REACT_APP_PRIVATEKEY // Replace with secure key storage

  try {
    const decryptedAESKey = CryptoJS.RSA.decrypt(encryptedAESKey, privateKey)
    const bytes = CryptoJS.AES.decrypt(encryptedData, decryptedAESKey, {
      iv: CryptoJS.enc.Base64.parse(iv)
    })
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error('Decryption error:', error)
    return '' // Or handle the error differently
  }
}
