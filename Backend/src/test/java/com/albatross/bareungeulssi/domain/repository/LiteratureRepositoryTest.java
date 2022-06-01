//package com.albatross.bareungeulssi.domain.repository;
//
//import com.albatross.bareungeulssi.domain.entity.Literature;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import java.util.List;
//
//
//class LiteratureRepositoryTest {
//
//    @Autowired
//    LiteratureRepository literatureRepository;
//
//    @Test
//    @DisplayName("작품 저장 테스트")
//    void createLitTest(){
//        Literature literature1 = new Literature();
//        literature1.setTitle("테스트 제목1");
//        literature1.setAuthor("윤동주");
//        literature1.setPlot("테스트 내용1");
//        Literature saved1 = literatureRepository.save(literature1);
//        System.out.println(saved1.toString());
//    }
//
//    @Test
//    @DisplayName("작가 이름으로 찾기 테스트")
//    void findByAuthorTest(){
//        Literature literature1 = new Literature();
//        literature1.setTitle("테스트 제목1");
//        literature1.setAuthor("윤동주");
//        literature1.setPlot("테스트 내용1");
//        Literature saved1 = literatureRepository.save(literature1);
//
//        Literature literature2 = new Literature();
//        literature2.setTitle("테스트 제목2");
//        literature2.setAuthor("윤동주");
//        literature2.setPlot("계절이 지나가는 하늘에는\n" +
//                "가을로 가득 차 있습니다.\n" +
//                "\n" +
//                "나는 아무 걱정도 없이\n" +
//                "가을 속의 별들을 다 헤일 듯합니다...\n" +
//                "\n" +
//                "가슴 속에 하나 둘 새겨지는 별을\n" +
//                "이제 다 못 헤는 것은\n" +
//                "쉬이 아침이 오는 까닭이요,\n" +
//                "내일 밤이 남은 까닭이요,\n" +
//                "아직 나의 청춘이 다하지 않은 까닭입니다.\n" +
//                "\n" +
//                "별 하나에 추억과\n" +
//                "별 하나에 사랑과\n" +
//                "별 하나에 쓸쓸함과\n" +
//                "별 하나에 동경과\n" +
//                "별 하나에 시와\n" +
//                "별 하나에 어머니, 어머니\n" +
//                "\n" +
//                "어머님, 나는 별 하나에 아름다운 말 한 마디씩 불러 봅니다. 소학교 때 책상을 같이했던 아이들의 이름과, 패, 경, 옥 이런 이국 소녀들의 이름과, 벌써 아기 어머니 된 계집애들의 이름과, 가난한 이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, '프랑시스 잠', '라이너 마리아 릴케', 이런 시인의 이름을 불러 봅니다.\n" +
//                "\n" +
//                "이네들은 너무나 멀리 있습니다.\n" +
//                "별이 아스라이 멀 듯이,\n" +
//                "\n" +
//                "어머님,\n" +
//                "그리고 당신은 멀리 북간도에 계십니다\n" +
//                "\n" +
//                "나는 무엇인지 그리워\n" +
//                "이 많은 별빛이 내린 언덕 위에\n" +
//                "내 이름자를 써 보고,\n" +
//                "흙으로 덮어 버리었읍니다.\n" +
//                "\n" +
//                "딴은, 밤을 새워 우는 벌레는\n" +
//                "부끄러운 이름을 슬퍼하는 까닭입니다.\n" +
//                "\n" +
//                "그러나 겨울이 지나고 나의 별에도 봄이 오면\n" +
//                "무덤 위에 파란 잔디가 피어나듯이\n" +
//                "내 이름자 묻힌 언덕 위에도\n" +
//                "자랑처럼 풀이 무성할 게외다.");
//        Literature saved2 = literatureRepository.save(literature2);
//
//        List<Literature> literatureList = literatureRepository.findByAuthor("윤동주");
//        for(Literature literature : literatureList){
//            System.out.println(literature.getTitle());
//            System.out.println(literature.getAuthor());
//            System.out.println(literature.getPlot());
//            //System.out.println(literature.toString());
//        }
//
//    }
//
//    @Test
//    @DisplayName("다 출력")
//    void litTest(){
//        literatureRepository.findAll().toString();
//    }
//}