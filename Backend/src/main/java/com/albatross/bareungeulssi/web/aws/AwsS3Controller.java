package com.albatross.bareungeulssi.web.aws;

import com.albatross.bareungeulssi.domain.entity.Record;
import com.albatross.bareungeulssi.domain.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/image/s3")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AwsS3Controller {
    private final AwsS3Service awsS3Service;

    @Autowired
    RecordRepository recordRepository;

//    @PostMapping("/resource")
//    public AwsS3 upload(@RequestPart("file") MultipartFile multipartFile) throws IOException {
//        return awsS3Service.upload(multipartFile,"captured-image");
//    }

    @PostMapping("/resource/{loginId}/{literatureId}/{page}/{imageName}")
    public AwsS3 upload(@RequestPart(value="file", required = false) MultipartFile multipartFile, @PathVariable String loginId, @PathVariable Long literatureId, @PathVariable Integer page, @PathVariable String imageName) throws IOException {
        Record record = Record.builder()
                .loginId(loginId)
                .literatureId(literatureId)
                .page(page)
                .imageName(imageName)
                .date(LocalDateTime.now())
                .build();
        recordRepository.save(record);
        return awsS3Service.upload(multipartFile,"captured-image");
    }

    @DeleteMapping("/resource")
    public void remove(AwsS3 awsS3) {
        awsS3Service.remove(awsS3);
    }
}
