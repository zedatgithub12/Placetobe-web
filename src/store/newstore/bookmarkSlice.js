import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bookmarks: []
};

const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState,
    reducers: {
        bookmarkEvent: (state, action) => {
            state.bookmarks.unshift({
                ...action.payload
            });
        },
        unBookmark: (state, action) => {
            state.bookmarks = state.bookmarks.filter((item) => item.id !== action.payload);
        }
    }
});

export const { bookmarkEvent, unBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
