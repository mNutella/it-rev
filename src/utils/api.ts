// Dependencies
import axios from 'axios';
import { Track } from '../models/track';

const base = 'http://localhost:3000';

export async function fetchWalks() {
  return (await axios.get(`${base}/walking`)).data as Array<Track>;
}

export async function fetchWalk(id: string) {
  return (await axios.get(`${base}/walking/${id}`)).data as Track;
}

export async function addWalk(walk: Track) {
  return (await axios.post(`${base}/walking/`, walk)).data as Track;
}

export async function updateWalk(id: number, walk: Track) {
  return (await axios.put(`${base}/walking/${id}`, walk)).data as Track;
}

export async function removeWalk(id: number) {
  return (await axios.delete(`${base}/walking/${id}`)).data as Track;
}
