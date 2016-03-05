import { SELECT_CATEGORY } from '../utils/constants'

export function selectCategory(category, sel) {
    return {
        type: SELECT_CATEGORY,
        selected: category,
        sel: sel
    }
}
