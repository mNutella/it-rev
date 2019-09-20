// Dependencies
import Vue from "vue";
import Vuex from "vuex";
import { Track } from "../models/track";

Vue.use(Vuex);

export interface State {
  tracks: Array<Track>;
  loading: boolean;
  table: TableState;
  modal: ModalState;
  snackbar: SnackbarState;
}

interface TableState {
  byDate: boolean;
  byDistance: boolean;
  byDateToggle: boolean;
  byDistanceToggle: boolean;
}

interface SnackbarState {
  message: String;
  active: boolean;
  color: String;
}

interface ModalState {
  show: boolean;
  update: boolean;
  track: Track;
}

const storeOptions = {
  state: {
    tracks: [],
    loading: false,
    table: {
      byDate: false,
      byDistance: false,
      byDateToggle: false,
      byDistanceToggle: false
    },
    snackbar: {
      message: "",
      active: false,
      color: "success"
    },
    modal: {
      show: false,
      update: false,
      track: {
        id: 0,
        date: new Date(),
        distance: 0
      }
    }
  },
  mutations: {
    setTracks(state: State, tracks: Array<Track>) {
      state.tracks = tracks;
    },
    setLoading(state: State, loading: boolean) {
      state.loading = loading;
    },
    setTable(state: State, table: TableState) {
      state.table = table;
    },
    setSnackbar(state: State, snackbar: SnackbarState) {
      state.snackbar = snackbar;
    },
    setModal(state: State, modal: ModalState) {
      state.modal = modal;
    }
  },
  getters: {
    tracks: (state: State) => state.tracks,
    table: (state: State) => state.table,
    snackbar: (state: State) => state.snackbar,
    modal: (state: State) => state.modal
  }
};

export const store = new Vuex.Store<State>(storeOptions);

// Getters
const getters = store.getters;

export const tracks = () => getters.tracks as Array<Track>;
export const loading = () => getters.loading as boolean;
export const table = () => getters.table as TableState;
export const snackbar = () => getters.snackbar as SnackbarState;
export const modal = () => getters.modal as ModalState;

// Actions
export const setTracks = (tracks: Array<Track>) => {
  store.commit("setTracks", tracks);
};
export const setLoading = (loading: boolean) => {
  store.commit("setLoading", loading);
};
export const setTable = (table: TableState) => {
  store.commit("setTable", table);
};
export const setSnackbar = (snackbar: SnackbarState) => {
  store.commit("setSnackbar", snackbar);
};
export const hideSnackbar = () => {
  store.commit("setSnackbar", { ...store.state.snackbar, active: false });
};
export const setModal = (modal: ModalState) => {
  store.commit("setModal", modal);
};
export const setModalToDefault = () => {
  store.commit("setModal", {
    ...store.state.modal,
    update: false,
    track: { id: 0, date: new Date(), distance: 0 }
  });
};
export const hideModal = () => {
  store.commit("setModal", { ...store.state.modal, show: false });
};
