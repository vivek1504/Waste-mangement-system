import { atom } from "recoil";

export const stepAtom = atom({
    key: 'stepAtom',
    default: 1
})

export const addressAtom = atom({
    key: 'addressAtom',
    default: {
        flat: '',
        area : '',
        city: '',
        state: '',
        pincode: ''
    }
})

export const imageAtom = atom({
    key: 'imageAtom',
    default: ''
})

export const complaintAtom = atom({
    key: 'complaintAtom',
    default: []
})

export const activeComplaintAtom = atom({
    key: 'activeComplaintAtom',
    default: []
})