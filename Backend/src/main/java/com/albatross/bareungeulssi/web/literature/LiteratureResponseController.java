package com.albatross.bareungeulssi.web.literature;

import com.albatross.bareungeulssi.domain.entity.Literature;
import com.albatross.bareungeulssi.domain.repository.LiteratureRepository;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;

//@Controller
@RestController
@RequestMapping("/basic/literatures")
public class LiteratureResponseController {

    @Autowired
    LiteratureRepository literatureRepository;

    @PostConstruct
    public void init(){
        Literature literature = new Literature();
//        literature.setId(1L);
//        literature.setTitle("");
//        literature.setAuthor("윤동주");
//        literature.setCheckNew(true);
//        literature.setCheckBest(false);

        literatureRepository.save(new Literature(1L, "서시", "윤동주"));
        literatureRepository.save(new Literature(2L, "청포도", "이육사"));
        literatureRepository.save(new Literature(3L, "부모", "김소월"));
        literatureRepository.save(new Literature(4L, "봄", "윤동주"));
        literatureRepository.save(new Literature(5L, "겨울", "윤동주"));
        literatureRepository.save(new Literature(6L, "고향집", "윤동주"));
        literatureRepository.save(new Literature(7L, "먼 후일", "김소월"));
        literatureRepository.save(new Literature(8L, "코스모스", "백국희"));
        literatureRepository.save(new Literature(9L, "진달래꽃", "김소월"));
        literatureRepository.save(new Literature(10L, "호수1", "정지용"));
        literatureRepository.save(new Literature(11L, "호수2", "정지용"));
        literatureRepository.save(new Literature(12L, "향수", "정지용"));

//

        //literatureRepository.save(new Literature(2L, "서시", "윤동주", plot2,false, true));
    }


//    @GetMapping
//    public String literatures(Model model) {
//
//        //List<Literature> literatureList = literatureRepository.findByTitle({제목});
//        List<Literature> literatures = literatureRepository.findAll();
//        model.addAttribute("literatures", literatures);
//        return "basic/literatures";
//    }

    //작품 목록 - JSON에 작품 목록이 다 담겨야함. Gson이용
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public String literatures(){
        List<Literature> literatureList= literatureRepository.findAll();
        //List<Literature> literatureList1= literatureRepository.findByCheckNew(true);
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        //String json1 = gson.toJson(literatureList1);

        //List<Literature> literatureList2= literatureRepository.findByCheckBest(true);
        //String json2 = gson.toJson(literatureList2);
        //String json = json1+json2;
        String json = gson.toJson(literatureList);
        return json;
    }

//    @GetMapping("/{id}")
//    public String literature(@PathVariable Long id, Model model){
//        Optional<Literature> optionalLiterature  = literatureRepository.findById(id);
//        Literature literature = optionalLiterature.get();
//        model.addAttribute("literature", literature);
//        return "basic/literature";
//    }

    //작품 상세 - JSON으로 id, 제목, 작가 리턴
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public String literature(@PathVariable Long id){
        Optional<Literature> optionalLiterature  = literatureRepository.findById(id);
        Literature literature = optionalLiterature.get();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String json = gson.toJson(literature);
        return json;
    }
}
