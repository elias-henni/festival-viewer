package be.kdg.programming5project.controllers.api.dto;

import lombok.Data;

@Data
public class ResponseData {
    private String fileName;
    private String downloadURL;
    private String fileType;
    private long fileSize;

    public ResponseData() {
    }

    public ResponseData(String fileName, String downloadURL, String fileType, long fileSize) {
        this.fileName = fileName;
        this.downloadURL = downloadURL;
        this.fileType = fileType;
        this.fileSize = fileSize;
    }

    public String getFileName() {
        return fileName;
    }

    public String getDownloadURL() {
        return downloadURL;
    }

    public String getFileType() {
        return fileType;
    }

    public long getFileSize() {
        return fileSize;
    }
}
