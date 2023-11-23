package it.uni.na.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import it.uni.na.model.Business;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Hashtable;

public class QRGenerationService {
    private QRGenerationService() {}

    @Transactional
    public static String findQRBusinessInformationService() {
        Business b = Business.findPrimaryBusiness();
        if(b!=null){
            if(b.getBusiness_logo() != null) {
                b.setBusiness_logo_encoded(Base64ManagerService.encodeToStringService(b.getBusiness_logo()));
                b.persist();
            }
            if(b.getBusiness_qr() != null) {
                b.setBusiness_qr_encoded(Base64ManagerService.encodeToStringService(b.getBusiness_qr()));
                b.persist();
            }
            return b.toStringQR();
        } else { return null; }
    }

    @Transactional
    public static Boolean generateQRCodeService(String menuaddress) {
        Business b = Business.findPrimaryBusiness();
        if(b!=null){
            if(b.getBusiness_logo() != null) {
                b.setBusiness_logo_encoded(Base64ManagerService.encodeToStringService(b.getBusiness_logo()));
            }
            if(b.getBusiness_qr() != null) {
                b.setBusiness_qr_encoded(Base64ManagerService.encodeToStringService(b.getBusiness_qr()));
            }
            else {
                String qrCodeText = menuaddress;
                String filePath = "src\\main\\resources\\static\\output-qr-code.png";
                int size = 125;
                String fileType = "png";
                File qrFile = new File(filePath);
                try {
                    createQRImage(qrFile, qrCodeText, size, fileType);

                    // Encode file to String to save it to Database
                    byte[] data = Files.readAllBytes(Paths.get(filePath));
                    b.setBusiness_qr(data);
                    b.setBusiness_qr_type("png");
                    b.persist();

                } catch(WriterException e) {
                    throw new WebApplicationException("Writer Exception for BUSINESS-INFORMATION/QR-GENERATION/POST/SERVICE encountered.",500);
                } catch(IOException e) {
                    throw new WebApplicationException("IOException for BUSINESS-INFORMATION/QR-GENERATION/POST/SERVICE encountered.",500);
                }
            }
            return true;
        } else { return false; }
    }

    private static void createQRImage(File qrFile, String qrCodeText, int size, String fileType)
            throws WriterException, IOException {
        // Create the ByteMatrix for the QR-Code that encodes the given String
        Hashtable<EncodeHintType, ErrorCorrectionLevel> hintMap = new Hashtable<>();
        hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);

        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix byteMatrix = qrCodeWriter.encode(qrCodeText, BarcodeFormat.QR_CODE, size, size, hintMap);

        // Make the BufferedImage that are to hold the QRCode
        int matrixWidth = byteMatrix.getWidth();
        BufferedImage image = new BufferedImage(matrixWidth, matrixWidth, BufferedImage.TYPE_INT_RGB);
        image.createGraphics();

        Graphics2D graphics = (Graphics2D) image.getGraphics();
        graphics.setColor(Color.WHITE);
        graphics.fillRect(0, 0, matrixWidth, matrixWidth);
        // Paint and save the image using the ByteMatrix
        graphics.setColor(Color.BLACK);

        for (int i = 0; i < matrixWidth; i++) {
            for (int j = 0; j < matrixWidth; j++) {
                if (byteMatrix.get(i, j)) {
                    graphics.fillRect(i, j, 1, 1);
                }
            }
        }
        ImageIO.write(image, fileType, qrFile);
    }
}
