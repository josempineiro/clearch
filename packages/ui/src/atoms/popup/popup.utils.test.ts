import { describe, expect, test } from 'vitest'
import { calcutatePopupStyles, CalculatePopupPositionParameters } from './popup.utils' //

export const CONENT_WIDTH_S = 200
export const CONENT_WIDTH_M = 300
export const CONENT_WIDTH_L = 400

class DOMRect {
  bottom = 0
  left = 0
  right = 0
  top = 0
  constructor(public x = 0, public y = 0, public width = 0, public height = 0) {
    this.bottom = y + height
    this.left = x
    this.right = x + width
    this.top = y
  }
  static fromRect(other: DOMRectInit): DOMRect {
    return new DOMRect(other.x, other.y, other.width, other.height)
  }
  toJSON() {
    return JSON.stringify(this)
  }
}

const TARGET_X = 200
const TARGET_Y = 200
const TARGET_WIDTH = 100
const TARGET_HEIGHT = 100

const CONTENT_X = 0
const CONTENT_Y = 0
const CONTENT_WIDTH = 200
const CONTENT_HEIGHT = 200

const OFFSET_Y = 10
const OFFSET_X = 10

const TARGET_RECT = new DOMRect(TARGET_X, TARGET_Y, TARGET_WIDTH, TARGET_HEIGHT)
const CONTENT_RECT = new DOMRect(CONTENT_X, CONTENT_Y, CONTENT_WIDTH, CONTENT_HEIGHT)

describe('Popup.util', () => {
  let expectedResult: ReturnType<typeof calcutatePopupStyles>
  let parameters: CalculatePopupPositionParameters
  beforeEach(() => {
    expectedResult = {
      left: TARGET_X + OFFSET_X,
      top: TARGET_Y + TARGET_HEIGHT + OFFSET_Y,
      width: CONTENT_WIDTH,
      transformX: 0,
      transformY: 0,
    }
    parameters = {
      targetRect: TARGET_RECT,
      contentRect: CONTENT_RECT,
      width: 'content',
      offsetX: OFFSET_X,
      offsetY: OFFSET_Y,
      position: 'bottom',
      alignment: 'start',
    }
  })
  describe('calculatePopupPosition', () => {
    describe('calculates width succesfully', () => {
      test('when width is s', () => {
        parameters.width = 's'
        expectedResult.width = CONENT_WIDTH_S
        expectedResult.width = CONENT_WIDTH_S
        const popupPosition = calcutatePopupStyles(parameters)
        expect(popupPosition).toEqual({
          left: 210,
          top: 310,
          width: 200,
          transformX: 0,
          transformY: 0,
        })
      })
      test('when width is m', () => {
        parameters.width = 'm'
        expectedResult.width = CONENT_WIDTH_M
        const popupPosition = calcutatePopupStyles(parameters)
        expect(popupPosition).toEqual(expectedResult)
      })
      test('when width is l', () => {
        parameters.width = 'l'
        expectedResult.width = CONENT_WIDTH_L
        const popupPosition = calcutatePopupStyles(parameters)
        expect(popupPosition).toEqual(expectedResult)
      })
      test('when width is content', () => {
        parameters.width = 'content'
        expectedResult.width = CONTENT_WIDTH
        const popupPosition = calcutatePopupStyles(parameters)
        expect(popupPosition).toEqual(expectedResult)
      })
    })
    describe('calculates x and y succesfully', () => {
      describe('when position is top', () => {
        beforeEach(() => {
          parameters.position = 'top'
          expectedResult.top = TARGET_Y - OFFSET_Y
          expectedResult.transformY = -100
        })
        test('and alignment is start', () => {
          parameters.alignment = 'start'
          expectedResult.left = TARGET_X + OFFSET_X
          const popupPosition = calcutatePopupStyles(parameters)
          expect(popupPosition).toEqual(expectedResult)
        })
        test('and alignment is middle', () => {
          parameters.alignment = 'middle'
          expectedResult.left = TARGET_X + TARGET_WIDTH / 2 + OFFSET_X
          expectedResult.transformX = -50
          const popupPosition = calcutatePopupStyles(parameters)
          expect(popupPosition).toEqual(expectedResult)
        })
        test('and alignment is end', () => {
          parameters.alignment = 'end'
          expectedResult.left = TARGET_X + TARGET_WIDTH - OFFSET_X
          expectedResult.transformX = -100
          const popupPosition = calcutatePopupStyles(parameters)
          expect(popupPosition).toEqual(expectedResult)
        })
        test('and width is target', () => {
          parameters.width = 'target'
          expectedResult.width = TARGET_WIDTH
          const popupPosition = calcutatePopupStyles(parameters)
          expect(popupPosition).toEqual(expectedResult)
        })
      })
      describe('when position is bottom', () => {
        beforeEach(() => {
          parameters.position = 'bottom'
          expectedResult.top = TARGET_Y + TARGET_HEIGHT + OFFSET_Y
        })
        test('and alignment is start', () => {
          parameters.alignment = 'start'
          expectedResult.left = TARGET_X + OFFSET_X
          const popupPosition = calcutatePopupStyles(parameters)
          expect(popupPosition).toEqual(expectedResult)
        })
        test('and alignment is middle', () => {
          parameters.alignment = 'middle'
          expectedResult.left = TARGET_X + TARGET_WIDTH / 2 + OFFSET_X
          expectedResult.transformX = -50
          const popupPosition = calcutatePopupStyles(parameters)
          expect(popupPosition).toEqual(expectedResult)
        })
        test('and alignment is end', () => {
          parameters.alignment = 'end'
          expectedResult.left = TARGET_X + TARGET_WIDTH - OFFSET_X
          expectedResult.transformX = -100
          const popupPosition = calcutatePopupStyles(parameters)
          expect(popupPosition).toEqual(expectedResult)
        })
        test('and width is target', () => {
          parameters.width = 'target'
          expectedResult.width = TARGET_WIDTH
          const popupPosition = calcutatePopupStyles(parameters)
          expect(popupPosition).toEqual(expectedResult)
        })
      })
      describe('when position is left', () => {
        beforeEach(() => {
          parameters.position = 'left'
          expectedResult.left = TARGET_X - OFFSET_X
          expectedResult.transformX = -100
          expectedResult.width = 190
        })
        test('and alignment is start', () => {
          parameters.alignment = 'start'
          expectedResult.top = TARGET_Y + OFFSET_Y
          const popupPosition = calcutatePopupStyles(parameters)
          expect(popupPosition).toEqual(expectedResult)
        })
        test('and alignment is middle', () => {
          parameters.alignment = 'middle'
          expectedResult.top = TARGET_Y + TARGET_HEIGHT / 2 + OFFSET_Y
          expectedResult.transformY = -50
          const popupPosition = calcutatePopupStyles(parameters)
          expect(popupPosition).toEqual(expectedResult)
        })
        test('and alignment is end', () => {
          parameters.alignment = 'end'
          expectedResult.top = TARGET_Y + TARGET_HEIGHT - OFFSET_Y
          expectedResult.transformY = -100
          const popupPosition = calcutatePopupStyles(parameters)
          expect(popupPosition).toEqual(expectedResult)
        })
        test('and width is target', () => {
          parameters.width = 'target'
          parameters.alignment = 'start'
          expectedResult.top = TARGET_Y + OFFSET_Y
          expectedResult.width = CONTENT_WIDTH
          const popupPosition = calcutatePopupStyles(parameters)
          expect(popupPosition).toEqual(expectedResult)
        })
      })
      describe('when position is right', () => {
        beforeEach(() => {
          parameters.position = 'right'
          expectedResult.left = TARGET_X + TARGET_WIDTH + OFFSET_X
        })
        test('and alignment is start', () => {
          parameters.alignment = 'start'
          expectedResult.top = TARGET_Y + OFFSET_Y
          const popupPosition = calcutatePopupStyles(parameters)
          expect(popupPosition).toEqual(expectedResult)
        })
        test('and alignment is middle', () => {
          parameters.alignment = 'middle'
          expectedResult.top = TARGET_Y + TARGET_HEIGHT / 2 + OFFSET_Y
          expectedResult.transformY = -50
          const popupPosition = calcutatePopupStyles(parameters)
          expect(popupPosition).toEqual(expectedResult)
        })
        test('and alignment is end', () => {
          parameters.alignment = 'end'
          expectedResult.transformY = -100
          expectedResult.top = TARGET_Y + TARGET_HEIGHT - OFFSET_Y
          const popupPosition = calcutatePopupStyles(parameters)
          expect(popupPosition).toEqual(expectedResult)
        })
      })
    })
  })
})
