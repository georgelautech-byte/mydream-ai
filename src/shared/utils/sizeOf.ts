export function sizeOf(obj: any) {
  let bytes = 0;
  if (obj !== null && obj !== undefined) {
    switch (typeof obj) {
      case 'number':
        bytes += 8;
        break;
      case 'string':
        bytes += obj.length * 2;
        break;
      case 'boolean':
        bytes += 4;
        break;
      case 'object':
        for (const key in obj) {
          bytes += sizeOf(obj[key]);
        }
        break;
    }
  }
  return bytes;
}
