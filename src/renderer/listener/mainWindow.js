import { MAIN_WINDOW_EVENT } from "@/constant/event";
import { ipcMain } from "electron";
import logger from "@/util/logger";

export default function (winHandler) {
    ipcMain.on(MAIN_WINDOW_EVENT.WINDOW_CLOSE, () => {
        winHandler.close();
    })

    ipcMain.on(MAIN_WINDOW_EVENT.WINDOW_MINIMIZE, () => {
        winHandler.minimize();
    })
}