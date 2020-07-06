export default {
    showSnackbar(state, payload) {
        state.snackbar.text = payload.text;
        state.snackbar.multiline = payload.text.length > 50 ? true : false;

        if (payload.multiline) {
            state.snackbar.multiline = payload.multiline;
        }

        if (payload.color) {
            state.snackbar.color = payload.color;
        }

        if (payload.timeout) {
            state.snackbar.timeout = payload.timeout;
        }

        state.snackbar.show = true;

        setTimeout(
            () => {
                state.snackbar.show = false;
            },
            payload.timeout ? payload.timeout : 6000
        );
    },
    closeSnackbar(state) {
        state.snackbar.show = false;
        state.snackbar.multiline = false;
        state.snackbar.timeout = 6000;
        state.snackbar.text = null;
    },
    toggleTheme(state) {
        state.isDark = !state.isDark;
    },
    setLoading(state, payload) {
        state.isLoading = payload;
    },
    setViewLoading(state, payload) {
        state.isViewLoading = payload;
    }
};
