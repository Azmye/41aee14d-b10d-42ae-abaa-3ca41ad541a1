export function editMarker(currValue: string, editedValue: string) {
  if (currValue !== editedValue) {
    return "bg-green-300/30";
  }

  return undefined;
}
