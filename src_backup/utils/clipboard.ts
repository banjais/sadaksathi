/**
 * Cross-browser clipboard utility
 * Works in all contexts including iframes and when Clipboard API is blocked
 */

export const copyToClipboard = async (text: string): Promise<boolean> => {
  // Method 1: Try modern Clipboard API (most secure, but may be blocked)
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('Clipboard API failed, using fallback:', err);
      // Continue to fallback method
    }
  }
  
  // Method 2: Fallback using execCommand (deprecated but widely supported)
  return fallbackCopyTextToClipboard(text);
};

/**
 * Fallback clipboard copy using document.execCommand
 * Works in browsers where Clipboard API is not available or blocked
 */
const fallbackCopyTextToClipboard = (text: string): boolean => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  
  // Make the textarea invisible but focusable
  textArea.style.position = 'fixed';
  textArea.style.top = '-999999px';
  textArea.style.left = '-999999px';
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = '0';
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    // Try to select all text
    textArea.setSelectionRange(0, 99999);
    
    // Execute copy command
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    if (successful) {
      console.log('✅ Text copied using fallback method');
      return true;
    } else {
      console.error('❌ execCommand copy failed');
      return false;
    }
  } catch (err) {
    console.error('❌ Fallback copy error:', err);
    document.body.removeChild(textArea);
    return false;
  }
};

/**
 * Read text from clipboard
 * Note: This requires user permission and may not work in all contexts
 */
export const readFromClipboard = async (): Promise<string | null> => {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      const text = await navigator.clipboard.readText();
      return text;
    } catch (err) {
      console.warn('Clipboard read failed:', err);
      return null;
    }
  }
  
  console.warn('Clipboard API not available for reading');
  return null;
};

/**
 * Check if clipboard API is available
 */
export const isClipboardAvailable = (): boolean => {
  return !!(navigator.clipboard && window.isSecureContext);
};
