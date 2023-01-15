export class CalculateCoinBalancesSparklines {
  /**
   * group together coin rates by table type
   * @param coinBalancesInTimeRange
   */
  private generateCombinedBalanceSparkline(coinBalancesInTimeRange: number[][][][]) {
    if (coinBalancesInTimeRange.length <= 1) {
      return coinBalancesInTimeRange.length ? coinBalancesInTimeRange[0] : [[], [], []]
    }

    const combineTimestamps = this.combineTimestamps(coinBalancesInTimeRange)

    return combineTimestamps.map((timestamps, index) => {
      const avgT = this.averageTimestamps(timestamps)

      return avgT.map(timestamp => {
        const totalBalance = coinBalancesInTimeRange.reduce<number[]>((acc, rates) => {
          const closest = this.findClosest(rates[index], timestamp)

          return closest.map((price, i) => (acc[i] || 0) + price)
        }, [])
        totalBalance[0] = Math.round(totalBalance[0] * 100) / 100 // change precision to 2 for usd
        totalBalance[1] = Math.round(totalBalance[1] * 1_000_000) / 1_000_000 // change precision to 6 for btc
        totalBalance[2] = Math.round(totalBalance[2] * 100_000) / 100_000 // change precision to 5 for eth

        return [timestamp, ...totalBalance]
      })
    })
  }

  /**
   * combine timestamps of all coin rates into one array
   *
   * @param coinBalancesInTimeRange
   * @private
   */
  private combineTimestamps(coinBalancesInTimeRange: number[][][][]) {
    return coinBalancesInTimeRange
      .reduce<number[][]>(
        (acc, el) => {
          acc[0].push(...(el[0]?.map(l => l[0]) || []))
          acc[1].push(...(el[1]?.map(l => l[0]) || []))
          acc[2].push(...(el[2]?.map(l => l[0]) || []))

          return acc
        },
        [[], [], []]
      )
      .map(rate => [...new Set(rate)])
  }

  /**
   * groups the closest time points together and then creates
   * a new array from the average times of these groups
   *
   * @param timestamps
   * @private
   */
  private averageTimestamps(timestamps: number[]) {
    timestamps.sort()
    const deltaTime = 120_000 // 2m
    const maxDiff = 480_000 // 8m
    const groupedTimestamps: number[][] = []
    let i = 1

    while (timestamps.length) {
      if (this.shouldBeGrouped(timestamps, i, deltaTime, maxDiff) || i >= timestamps.length) {
        groupedTimestamps.push(timestamps.splice(0, i))
        i = 0
      }

      i++
    }

    return groupedTimestamps.map(
      times => Math.round(times.reduce((a, b) => a + b, 0) / times.length) //times.map(t => new Date(t))
    )
  }

  /**
   * Check if the difference between the current timestamp and the previous is greater than  deltaTime,
   * or the difference between the first and last timestamps in the group is greater than maxDiff
   * @param timestamps
   * @param index
   * @param deltaTime
   * @param maxDiff
   * @private
   */
  private shouldBeGrouped(timestamps: number[], index: number, deltaTime: number, maxDiff: number) {
    return (
      Math.abs(timestamps[index - 1] - timestamps[index]) > deltaTime ||
      Math.abs(timestamps[0] - timestamps[index]) > maxDiff
    )
  }

  /**
   * Method to compare which one is the more close
   * We find the closest by taking the difference
   * between the target and both values. It assumes
   * that secondValue is greater than firstValue and target lies
   * between these two.
   *
   * @param firstValue
   * @param secondValue
   * @param target
   * @param firstIndex
   * @param secondIndex
   * @private
   */
  private getClosest(firstValue: number, secondValue: number, target: number, firstIndex: number, secondIndex: number) {
    if (Math.abs(target - firstValue) < Math.abs(secondValue - target)) {
      return firstIndex
    }

    return secondIndex
  }

  /**
   * Method to find element
   * closest to given target using binary search.
   * Returns element closest to target in arr[]
   * https:www.geeksforgeeks.org/find-closest-number-array
   *
   * @param arr
   * @param target
   * @private
   */
  private binarySearch(arr: number[][], target: number) {
    const n = arr.length - 1
    let start = 0
    let end = n
    // Find the mid index
    let mid = Math.floor((start + end) / 2)

    while (start < end) {
      mid = Math.floor((start + end) / 2)

      if (arr[mid][0] === target) {
        return mid
      }

      // If target is less than array
      // element,then search in left
      if (target < arr[mid][0]) {
        // If target is greater than previous
        // to mid, return closest of two
        if (mid > 0 && target > arr[mid - 1][0]) {
          return this.getClosest(arr[mid - 1][0], arr[mid][0], target, mid - 1, mid)
        }

        // Repeat for left half
        end = mid
      }

      // If target is greater than mid
      else {
        if (mid < n - 1 && target < arr[mid + 1][0]) {
          return this.getClosest(arr[mid][0], arr[mid + 1][0], target, mid, mid + 1)
        }

        start = mid + 1 // update i
      }
    }

    return mid
  }

  private findClosest(arr: number[][], target: number) {
    if (!arr?.length) {
      return [0, 0, 0]
    }

    const n = arr.length

    // Corner cases
    if (target <= arr[0][0]) {
      return arr[0].slice(1)
    }

    if (target >= arr[n - 1][0]) {
      return arr[n - 1].slice(1)
    }

    // Doing binary search
    const index = this.binarySearch(arr, target)

    // Only single element left after search
    return arr[index].slice(1)
  }
}
