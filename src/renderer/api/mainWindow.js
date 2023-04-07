import { ipcMain } from "electron";
import repoModule from '@/module/repo';
import AppError from "@/lib/class/AppError";
import ApiResponse from "@/lib/class/ApiResponse";
import logger from "@/util/logger";

export default function () {
    ipcMain.handle('mainWindow:getRepoList', async () => {
        try {
            const data = await repoModule.repoList();
            return new ApiResponse(data);
        } catch (err) {
            if (err instanceof AppError) {
                return new ApiResponse(err);
            } else {
                logger.error(err);
                return new ApiResponse(new Error())
            }
        }
    })

    ipcMain.handle('mainWindow:createRepo', async (e, { repoName, repoRemoteAddress }) => {
        try {
            logger.debug(repoName, repoRemoteAddress);
            const data = await repoModule.repoInit(repoName, repoRemoteAddress);
            return new ApiResponse(data);
        } catch (err) {
            if (err instanceof AppError) {
                return new ApiResponse(err);
            } else {
                logger.error(err);
                return new ApiResponse(new Error());
            }
        }
    })
}