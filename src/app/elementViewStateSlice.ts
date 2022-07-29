import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PAGES } from "../constant/pages";

enum ViewState {
  TOTAL,
  SUB,
  NONE,
}

type ElementViewStateType = {
  states: {
    [key in PAGES]?: ViewState;
  };
  target: PAGES;
};

type ElementPositionType = {
  [key in PAGES]: {
    top: number;
    bottom: number;
  };
};

let initialState: ElementViewStateType = {
  states: {
    [PAGES.DASHBOARD]: ViewState.TOTAL,
  },
  target: PAGES.DASHBOARD,
} as ElementViewStateType;

export const updateElementViewState = createAsyncThunk(
  "elementViewState/updateElementViewState",
  async () => {
    let result: {
      [key in PAGES]?: ViewState;
    } = {} as {
      [key in PAGES]?: ViewState;
    };
    let elementPositions: ElementPositionType = {} as ElementPositionType;
    let totalElements: PAGES[] = [],
      subElements: PAGES[] = [];
    const vHeight = window.innerHeight || document.documentElement.clientHeight;
    (Object.keys(PAGES) as Array<keyof typeof PAGES>).forEach((key) => {
      const crrPage = PAGES[key];
      if (crrPage !== PAGES.MAINCONTENT) {
        // except main content. it is just wrapper.
        const me = document.getElementById(crrPage);
        if (!me) return;
        const { top, bottom } = me.getBoundingClientRect();
        elementPositions[crrPage] = { top, bottom };

        if (top < vHeight && bottom < vHeight && top >= 0) {
          result[crrPage] = ViewState.TOTAL;
          totalElements = [...totalElements, crrPage];
        } else if (top < 0 && bottom >= 0) {
          result[crrPage] = ViewState.SUB;
          subElements = [...subElements, crrPage];
        } else if (top >= 0 && top < vHeight && bottom > vHeight) {
          result[crrPage] = ViewState.SUB;
          subElements = [...subElements, crrPage];
        } else {
          result[crrPage] = ViewState.NONE;
        }
      }
    });
    totalElements = totalElements.sort(
      (page1, page2) =>
        elementPositions[page2]?.top || 0 - elementPositions[page1]?.top || 0
    );
    subElements = subElements.sort(
      (page1, page2) =>
        elementPositions[page2]?.top || 0 - elementPositions[page1]?.top || 0
    );
    const targetElement = totalElements[0] || subElements[0] || PAGES.DASHBOARD;
    return { states: result, target: targetElement };
  }
);

export const elementViewStateSlice = createSlice({
  name: "elementViewState",
  initialState,
  reducers: {
    clearElementViewState: (state, action: PayloadAction) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateElementViewState.fulfilled, (state, action) => {
      const { states, target } = action.payload;
      state.states = states;
      state.target = target;
    });
  },
});

export const { clearElementViewState } = elementViewStateSlice.actions;

export default elementViewStateSlice.reducer;
