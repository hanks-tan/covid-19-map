class Grid {
  static createGrid (startPoint, xCellWidth, yCellWidth, xCount, yCount) {
    const extentList = []
    for (let i = 0; i < xCount; i++) {
      const x = startPoint.x + xCellWidth * i
      for (let j = 0; j < yCount; j++) {
        const y = startPoint.y + yCellWidth * j
        const extent = [x, y, x + xCellWidth, y + yCellWidth]
        extentList.push(extent)
      }
    }

    return extentList
  }
}

export default Grid
