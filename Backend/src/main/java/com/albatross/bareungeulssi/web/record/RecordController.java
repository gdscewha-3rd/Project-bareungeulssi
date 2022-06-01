package com.albatross.bareungeulssi.web.record;

import com.albatross.bareungeulssi.domain.entity.Literature;
import com.albatross.bareungeulssi.domain.entity.Record;
import com.albatross.bareungeulssi.domain.repository.RecordRepository;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/record")
public class RecordController {

    @Autowired
    RecordRepository recordRepository;

    //로그인한 사용자 아이디, 문학작품 아이디, 이미지 주소, 점수를 이용해서 record 테이블에 저장
//    @ResponseStatus(HttpStatus.OK)
//    @PostMapping("/{loginId}/{literatureId}/{imageName}/{score}")
//    public String saveRecord(@PathVariable String loginId, @PathVariable Long literatureId, @PathVariable String imageName, @PathVariable Integer score){
//        String imageS3Id = imageName;
//        Record record = Record.builder()
//                                .loginId(loginId)
//                                .literatureId(literatureId)
//                                .imageName(imageName)
//                                .score(score)
//                                .date(LocalDateTime.now())
//                                .build();
//        recordRepository.save(record);
//
//        //main으로 리다이렉션
////        return "redirect:/";
//        //resource로 이동시키기 - s3 저장 - redirect 말고 다른 방법?
//        return "redirect:/image/s3/resource";
//    }

    //로그인한 사용자 아이디 기준 조회
    @GetMapping("/{loginId}")
    public String findRecord(@PathVariable String loginId){
        Optional <List<Record>> optionalRecord  = recordRepository.findByLoginId(loginId); //Optional<Record> -> Optional<List<Record>>
        List<Record> records = optionalRecord.get();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String json = gson.toJson(records);
        return json;
    }
}
