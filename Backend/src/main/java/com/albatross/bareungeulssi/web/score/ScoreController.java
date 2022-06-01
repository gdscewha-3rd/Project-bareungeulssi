package com.albatross.bareungeulssi.web.score;


import com.albatross.bareungeulssi.domain.entity.TextBook;
import com.albatross.bareungeulssi.domain.repository.RecordRepository;
import com.albatross.bareungeulssi.domain.repository.TextBookRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.lang.reflect.Array;
import java.util.*;

import static com.google.gson.JsonParser.parseReader;
import static com.google.gson.JsonParser.parseString;

@Slf4j
@RestController
@RequestMapping(value = "/score", produces = "application/json; charset=utf8")
@RequiredArgsConstructor
public class ScoreController {

    @Autowired
    TextBookRepository textBookRepository;
    @Autowired
    RecordRepository recordRepository;

    ArrayList<Feedback> feedbacks = new ArrayList<Feedback>(); //피드백 담을 리스트

    //{"score": 95, "feedback":{"0":[[x,y],1]}
    @PostMapping("/{imageName}/{literatureId}/{page}/{fontPath}")
    public String jsonList(@RequestBody Map<String, Object> param, @PathVariable String imageName, @PathVariable Long literatureId, @PathVariable Integer page, @PathVariable String fontPath){
        //HashMap<String, Object> result = new HashMap<String, Object>();
        /*
        [
          {
          }
        ]
        들어오는 json이 이렇게([]) 싸여있으므로 List로 Map을 감싸줘야함.
        */
        int score=100;

        boolean flag0 = true;
        boolean flag1 = true;
        boolean flag2 = true;
        boolean flag3 = true;

        Gson gson = new Gson();

        JsonElement elementUserSyllable = parseString(param.get("syllable").toString()); //"syllable" 키 값으로 찾기 - 음절 정보
        JsonElement elementUserCharacter = parseString(param.get("character").toString()); //"character" 키 값으로 찾기 - 음소 정보


        Map<String, Object> userSyllableMap = gson.fromJson(elementUserSyllable.toString(), Map.class); //"syllable" 키로 찾은 json
        JsonElement userLineZeroSyllable = parseString(userSyllableMap.get("0").toString()); //"0" 키로 찾기
        //List<List<Integer>> userLineZeroSyllableList = gson.fromJson(userLineZeroSyllable, (new TypeToken<List<List<Integer>>>() { }).getType()); //0번째 줄의 음절 정보 배열
        ArrayList<ArrayList<Integer>> userLineZeroSyllableList = gson.fromJson(userLineZeroSyllable, (new TypeToken<ArrayList<ArrayList<Integer>>>() { }).getType()); //0번째 줄의 음절 정보 배열
        if(userLineZeroSyllableList.size()==0){
            flag0=false;
        }

        if(flag0) {
            Map<String, Object> userJamoMap = gson.fromJson(elementUserCharacter.toString(), Map.class);
            JsonElement userLineZeroJamo = parseString(userJamoMap.get("0").toString());
            ArrayList<ArrayList<ArrayList<Integer>>> userLineZeroJamoList = gson.fromJson(userLineZeroJamo, (new TypeToken<ArrayList<ArrayList<ArrayList<Integer>>>>() {
            }).getType()); //0번째 줄의 음소 정보 배열

            JsonElement userLineOneSyllable = parseString(userSyllableMap.get("1").toString()); //"1" 키로 찾기
            //List<List<Integer>> userLineOneSyllableList = gson.fromJson(userLineOneSyllable, (new TypeToken<List<List<Integer>>>() { }).getType()); //1번째 줄의 음절 정보 배열
            ArrayList<ArrayList<Integer>> userLineOneSyllableList = gson.fromJson(userLineOneSyllable, (new TypeToken<ArrayList<ArrayList<Integer>>>() {
            }).getType()); //1번째 줄의 음절 정보 배열

            JsonElement userLineOneJamo = parseString(userJamoMap.get("1").toString());
            ArrayList<ArrayList<ArrayList<Integer>>> userLineOneJamoList = gson.fromJson(userLineOneJamo, (new TypeToken<ArrayList<ArrayList<ArrayList<Integer>>>>() {
            }).getType()); //1번째 줄의 음소 정보 배열

            JsonElement userLineTwoSyllable = parseString(userSyllableMap.get("2").toString()); //"2" 키로 찾기
            //List<List<Integer>> userLineTwoSyllableList = gson.fromJson(userLineTwoSyllable, (new TypeToken<List<List<Integer>>>() { }).getType()); //2번째 줄의 음절 정보 배열
            ArrayList<ArrayList<Integer>> userLineTwoSyllableList = gson.fromJson(userLineTwoSyllable, (new TypeToken<ArrayList<ArrayList<Integer>>>() {
            }).getType()); //2번째 줄의 음절 정보 배열

            JsonElement userLineTwoJamo = parseString(userJamoMap.get("2").toString());
            ArrayList<ArrayList<ArrayList<Integer>>> userLineTwoJamoList = gson.fromJson(userLineTwoJamo, (new TypeToken<ArrayList<ArrayList<ArrayList<Integer>>>>() {
            }).getType()); //2번째 줄의 음소 정보 배열

            JsonElement userLineThreeSyllable = parseString(userSyllableMap.get("3").toString()); //"3" 키로 찾기
            //List<List<Integer>> userLineThreeSyllableList = gson.fromJson(userLineThreeSyllable, (new TypeToken<List<List<Integer>>>() { }).getType()); //3번째 줄의 음절 정보 배열
            ArrayList<ArrayList<Integer>> userLineThreeSyllableList = gson.fromJson(userLineThreeSyllable, (new TypeToken<ArrayList<ArrayList<Integer>>>() {
            }).getType()); //3번째 줄의 음절 정보 배열

            JsonElement userLineThreeJamo = parseString(userJamoMap.get("3").toString());
            ArrayList<ArrayList<ArrayList<Integer>>> userLineThreeJamoList = gson.fromJson(userLineThreeJamo, (new TypeToken<ArrayList<ArrayList<ArrayList<Integer>>>>() {
            }).getType()); //3번째 줄의 음소 정보 배열

            //1,2,3,4번째 줄 사용자 글씨 음절 리스트 모은 리스트
            ArrayList<ArrayList<ArrayList<Integer>>> userSyllableList = new ArrayList<ArrayList<ArrayList<Integer>>>();
            //List<List<List<Integer>>> userSyllableList = new ArrayList<>();
            userSyllableList.add(userLineZeroSyllableList);
            userSyllableList.add(userLineOneSyllableList);
            userSyllableList.add(userLineTwoSyllableList);
            userSyllableList.add(userLineThreeSyllableList);

            //1,2,3,4번째 줄 사용자 글씨 음소 리스트 모은 리스트
            ArrayList<ArrayList<ArrayList<ArrayList<Integer>>>> userJamoList = new ArrayList<ArrayList<ArrayList<ArrayList<Integer>>>>();
            userJamoList.add(userLineZeroJamoList);
            userJamoList.add(userLineOneJamoList);
            userJamoList.add(userLineTwoJamoList);
            userJamoList.add(userLineThreeJamoList);

            //DB에서 textBook 정보 불러오기
            TextBook textBook = textBookRepository.findByLiteratureIdAndPageAndFontPath(literatureId, page, fontPath);
            log.info("textbook literature id: {}", textBook.getLiteratureId());

            Map<String, Object> textBookMap = textBook.getTextBookAnalysis();

            JsonElement elementTextBookSyllable = parseString(textBookMap.get("syllable").toString()); //음절 정보
            JsonElement elementTextBookCharacter = parseString(textBookMap.get("character").toString());

            Map<String, Object> textBookSyllableMap = gson.fromJson(elementTextBookSyllable.toString(), Map.class);
            JsonElement textBookLineZeroSyllable = parseString(textBookSyllableMap.get("0").toString()); //"0" 키로 찾기
            List<List<Integer>> textBookLineZeroSyllableList = gson.fromJson(textBookLineZeroSyllable, (new TypeToken<List<List<Integer>>>() {
            }).getType()); //0번째 줄의 음절 정보 배열

            Map<String, Object> textBookJamoMap = gson.fromJson(elementTextBookCharacter.toString(), Map.class);
            JsonElement textBookLineZeroJamo = parseString(textBookJamoMap.get("0").toString()); //0번째 줄
            List<List<List<Integer>>> textBookLineZeroJamoList = gson.fromJson(textBookLineZeroJamo, (new TypeToken<List<List<List<Integer>>>>() {
            }).getType()); //0번째 줄의 음소 정보 배열

            JsonElement textBookLineOneSyllable = parseString(textBookSyllableMap.get("1").toString()); //"1" 키로 찾기
            List<List<Integer>> textBookLineOneSyllableList = gson.fromJson(textBookLineOneSyllable, (new TypeToken<List<List<Integer>>>() {
            }).getType()); //1번째 줄의 음절 정보 배열

            JsonElement textBookLineOneJamo = parseString(textBookJamoMap.get("1").toString()); //1번째 줄
            List<List<List<Integer>>> textBookLineOneJamoList = gson.fromJson(textBookLineOneJamo, (new TypeToken<List<List<List<Integer>>>>() {
            }).getType()); //1번째 줄의 음소 정보 배열

            JsonElement textBookLineTwoSyllable = parseString(textBookSyllableMap.get("2").toString()); //"2" 키로 찾기
            List<List<Integer>> textBookLineTwoSyllableList = gson.fromJson(textBookLineTwoSyllable, (new TypeToken<List<List<Integer>>>() {
            }).getType()); //2번째 줄의 음절 정보 배열

            JsonElement textBookLineTwoJamo = parseString(textBookJamoMap.get("2").toString()); //0번째 줄
            List<List<List<Integer>>> textBookLineTwoJamoList = gson.fromJson(textBookLineTwoJamo, (new TypeToken<List<List<List<Integer>>>>() {
            }).getType()); //2번째 줄의 음소 정보 배열

            JsonElement textBookLineThreeSyllable = parseString(textBookSyllableMap.get("3").toString()); //"3" 키로 찾기
            List<List<Integer>> textBookLineThreeSyllableList = gson.fromJson(textBookLineThreeSyllable, (new TypeToken<List<List<Integer>>>() {
            }).getType()); //3번째 줄의 음절 정보 배열

            JsonElement textBookLineThreeJamo = parseString(textBookJamoMap.get("3").toString()); //3번째 줄
            List<List<List<Integer>>> textBookLineThreeJamoList = gson.fromJson(textBookLineThreeJamo, (new TypeToken<List<List<List<Integer>>>>() {
            }).getType()); //3번째 줄의 음소 정보 배열

            //1,2,3,4번째 줄 교본 글시 음절 리스트 모은 리스트
            List<List<List<Integer>>> textBookSyllableList = new ArrayList<List<List<Integer>>>();
            textBookSyllableList.add(textBookLineZeroSyllableList);
            textBookSyllableList.add(textBookLineOneSyllableList);
            textBookSyllableList.add(textBookLineTwoSyllableList);
            textBookSyllableList.add(textBookLineThreeSyllableList);

            //1,2,3,4번째 줄 교본 글시 음절 리스트 모은 리스트
            List<List<List<List<Integer>>>> textBookJamoList = new ArrayList<List<List<List<Integer>>>>();
            textBookJamoList.add(textBookLineZeroJamoList);
            textBookJamoList.add(textBookLineOneJamoList);
            textBookJamoList.add(textBookLineTwoJamoList);
            textBookJamoList.add(textBookLineThreeJamoList);


            int midWidth = 0;
            int midHeight = 0;
            ArrayList<Integer> cyList = new ArrayList<>();
            ArrayList<Integer> widthList = new ArrayList<>();
            ArrayList<Integer> heightList = new ArrayList<>();
            ArrayList<Integer> midWidthList = new ArrayList<>();
            ArrayList<Integer> midHeightList = new ArrayList<>();
            //첫번째 줄 음절 점수 계산
            //int userLineZeroSyllableListSize = userLineZeroSyllableList.size();

            //1. 전체적인 기울기에 유의해서 작성해보세요! : 사용자 글씨 cy값으로 판단
            for (int i = 0; i < 4; i++) { //i번째 줄
                int userLineSyllableCnt = userSyllableList.get(i).size();
                for (int j = 0; j < userLineSyllableCnt; j++) { //j번째 음절
                    cyList.add(userSyllableList.get(i).get(j).get(4));

                    widthList.add(userSyllableList.get(i).get(j).get(2));
                    heightList.add(userSyllableList.get(i).get(j).get(3));
                }

                if(userLineSyllableCnt>0) {
                    cyList.sort(Comparator.naturalOrder()); //오름차순 정렬

                    widthList.sort(Comparator.naturalOrder());
                    heightList.sort(Comparator.naturalOrder());

                    midWidth = widthList.get(widthList.size() / 2);
                    midHeight = heightList.get(heightList.size() / 2);
                    midWidthList.add(midWidth);
                    midHeightList.add(midHeight);

                    int midIdx = cyList.size() / 2;
                    int mid = cyList.get(midIdx); //cy 중간값

                    //log.info("middle cy: {}", mid);

                    int x1 = userSyllableList.get(i).get(userLineSyllableCnt - 1).get(0) + userSyllableList.get(i).get(userLineSyllableCnt - 1).get(2) + 20; //마지막 음절의 x좌표 + 20
                    int y1 = userSyllableList.get(i).get(userLineSyllableCnt - 1).get(4); //마지막 음절의 cy좌표

                    for (int j = 0; j < userLineSyllableCnt; j++) { //j번째 음절
                        if (Math.abs(userSyllableList.get(i).get(j).get(4) - mid) >= 8 ||
                                (j < userLineSyllableCnt - 1 && Math.abs(userSyllableList.get(i).get(j).get(4) - userSyllableList.get(i).get(j + 1).get(4)) >= 6)) {
                            score -= 2;
                            Feedback feedback = new Feedback(score, 1, x1, y1, i);
                            feedbacks.add(feedback);
                            //log.info("feedback: fidx={}::x={}::y={}::line={}", feedback.getFidx(), feedback.getX(), feedback.getY(), feedback.getLine());
                            break; //기울기 피드백 하나만 생성
                        }
                    }
                }

                //초기화
                cyList.clear();
                widthList.clear();
                heightList.clear();
                //midWidth = 0;
                //midHeight = 0;
            }


            //2. 글자 간격을 주의해서 작성해보세요!(pass)


            //폰트와의 음절 개수 다른 것 정리
            for (int i = 0; i < 4; i++) {
                if (userSyllableList.get(i).size() > textBookSyllableList.get(i).size()) { //한 음절이 두 음절로 인식되는 경우
                    for (int j = 1; j < userSyllableList.get(i).size() - 1; j++) { //26이하이면 양 옆에 값 비교해서 더 작은 글자와 합치기
                        if (userSyllableList.get(i).get(j).get(2) <= 26) {
                            if (userSyllableList.get(i).get(j - 1).get(2) < userSyllableList.get(i).get(j + 1).get(2)) {
                                //j-1번째 음절을 j번째 음절과 합침(x,y최소, w = x2+w2-x1, h = max(h1,h2), cy = y+h/2
                                userSyllableList.get(i).get(j - 1).set(0, Math.min(userSyllableList.get(i).get(j - 1).get(0), userSyllableList.get(i).get(j).get(0))); //x값
                                userSyllableList.get(i).get(j - 1).set(1, Math.min(userSyllableList.get(i).get(j - 1).get(1), userSyllableList.get(i).get(j).get(1))); //y값
                                userSyllableList.get(i).get(j - 1).set(2, userSyllableList.get(i).get(j).get(0) + userSyllableList.get(i).get(j).get(2) - userSyllableList.get(i).get(j - 1).get(0)); //w값
                                userSyllableList.get(i).get(j - 1).set(3, Math.max(userSyllableList.get(i).get(j - 1).get(3), userSyllableList.get(i).get(j).get(3))); //h값
                                userSyllableList.get(i).get(j - 1).set(4, userSyllableList.get(i).get(j - 1).get(1) + userSyllableList.get(i).get(j - 1).get(3) / 2); //cy값

                                userSyllableList.get(i).remove(j);
                                j--;
                            } else {
                                //j+1번째 음절을 j번째 음절과 합침
                                userSyllableList.get(i).get(j).set(0, Math.min(userSyllableList.get(i).get(j).get(0), userSyllableList.get(i).get(j + 1).get(0))); //x값
                                userSyllableList.get(i).get(j).set(1, Math.min(userSyllableList.get(i).get(j).get(1), userSyllableList.get(i).get(j + 1).get(1))); //y값
                                userSyllableList.get(i).get(j).set(2, userSyllableList.get(i).get(j + 1).get(0) + userSyllableList.get(i).get(j + 1).get(2) - userSyllableList.get(i).get(j).get(0)); //w값
                                userSyllableList.get(i).get(j).set(3, Math.max(userSyllableList.get(i).get(j).get(3), userSyllableList.get(i).get(j + 1).get(3))); //h값
                                userSyllableList.get(i).get(j).set(4, userSyllableList.get(i).get(j).get(1) + userSyllableList.get(i).get(j).get(3) / 2); //cy값

                                userSyllableList.get(i).remove(j + 1);
                            }
                        }
                    }
                    //맨 왼쪽
                    if (userSyllableList.get(i).get(0).get(2) <= 26) {
                        userSyllableList.get(i).get(0).set(0, Math.min(userSyllableList.get(i).get(0).get(0), userSyllableList.get(i).get(1).get(0))); //x값
                        userSyllableList.get(i).get(0).set(1, Math.min(userSyllableList.get(i).get(0).get(1), userSyllableList.get(i).get(1).get(1))); //y값
                        userSyllableList.get(i).get(0).set(2, userSyllableList.get(i).get(1).get(0) + userSyllableList.get(i).get(1).get(2) - userSyllableList.get(i).get(0).get(0)); //w값
                        userSyllableList.get(i).get(0).set(3, Math.max(userSyllableList.get(i).get(0).get(3), userSyllableList.get(i).get(1).get(3))); //h값
                        userSyllableList.get(i).get(0).set(4, userSyllableList.get(i).get(0).get(1) + userSyllableList.get(i).get(0).get(3) / 2); //cy값

                        userSyllableList.get(i).remove(1);
                    }
                    //맨 오른쪽
                    if (userSyllableList.get(i).get(userSyllableList.get(i).size() - 1).get(2) <= 26) {
                        userSyllableList.get(i).get(userSyllableList.get(i).size() - 2).set(0, Math.min(userSyllableList.get(i).get(userSyllableList.get(i).size() - 2).get(0), userSyllableList.get(i).get(userSyllableList.get(i).size() - 1).get(0))); //x값
                        userSyllableList.get(i).get(userSyllableList.get(i).size() - 2).set(1, Math.min(userSyllableList.get(i).get(userSyllableList.get(i).size() - 2).get(1), userSyllableList.get(i).get(userSyllableList.get(i).size() - 1).get(1))); //y값
                        userSyllableList.get(i).get(userSyllableList.get(i).size() - 2).set(2, userSyllableList.get(i).get(userSyllableList.get(i).size() - 1).get(0) + userSyllableList.get(i).get(userSyllableList.get(i).size() - 1).get(2) - userSyllableList.get(i).get(userSyllableList.get(i).size() - 2).get(0)); //w값
                        userSyllableList.get(i).get(userSyllableList.get(i).size() - 2).set(3, Math.max(userSyllableList.get(i).get(userSyllableList.get(i).size() - 2).get(3), userSyllableList.get(i).get(userSyllableList.get(i).size() - 1).get(3))); //h값
                        userSyllableList.get(i).get(userSyllableList.get(i).size() - 2).set(4, userSyllableList.get(i).get(userSyllableList.get(i).size() - 2).get(1) + userSyllableList.get(i).get(userSyllableList.get(i).size() - 2).get(3) / 2); //cy값

                        userSyllableList.get(i).remove(userSyllableList.get(i).size() - 1);
                    }

                }
            }


            //3. 이 글자의 전체적인 크기에 주의해서 작성해보세요!
            //전체적인 크기에 유의해서 작성해보세요! : 사용자 글씨 w, h 중간값과의 차이

            for (int i = 0; i < 4; i++) { //i번째 줄
                int userLineSyllableCnt = userSyllableList.get(i).size();

                for (int j = 0; j < userLineSyllableCnt; j++) { //j번째 음절
                    if (Math.abs(userSyllableList.get(i).get(j).get(2) - midWidthList.get(i)) >= 11 || Math.abs(userSyllableList.get(i).get(j).get(3) - midHeightList.get(i)) >= 11) {
                        int x3 = userSyllableList.get(i).get(j).get(0) + userSyllableList.get(i).get(j).get(2) / 2;
                        int y3 = userSyllableList.get(i).get(j).get(1) - 10;
                        score -= 2;
                        Feedback feedback = new Feedback(score, 3, x3, y3, i);
                        feedbacks.add(feedback);
                        //log.info("feedback: fidx={}::x={}::y={}::line={}", feedback.getFidx(), feedback.getX(), feedback.getY(), feedback.getLine());
                    }
                }

                //초기화
                cyList.clear();
                widthList.clear();
                heightList.clear();
            }

        /*
        for(int i=0; i<4; i++){
            for(int j=0; j<textBookSyllableList.get(i).size(); j++){
                if(textBookSyllableList.get(i).get(j).get(3)-userSyllableList.get(i).get(j).get(3)>=10
                    || textBookSyllableList.get(i).get(j).get(3)-userSyllableList.get(i).get(j).get(3)<=(-7)
                    ||textBookSyllableList.get(i).get(j).get(2)-userSyllableList.get(i).get(j).get(2)>=10
                    || textBookSyllableList.get(i).get(j).get(2)-userSyllableList.get(i).get(j).get(2)<=(-7)){

                    score -= 1;
                    int x3 = userSyllableList.get(i).get(j).get(0)+userSyllableList.get(i).get(j).get(2)/2;
                    int y3 = userSyllableList.get(i).get(j).get(1)-10;
                    Feedback feedback = new Feedback(score, 3, x3, y3, i);
                    feedbacks.add(feedback);
                }
            }
        }*/

            //TODO. 4,5,6 폰트/사용자 자음, 모음, 받침 비율 >임계값 -> feedback에 저장
            //TODO. 4. 이 글자의 자음에 주의해서 작성해보세요!
            //TODO. 5. 이 글자의 모음에 주의해서 작성해보세요!
            //TODO. 6. 이 글자의 받침에 주의해서 작성해보세요!
            for (int i = 0; i < 4; i++) {
                int range = Math.min(userJamoList.get(i).size(), textBookJamoList.get(i).size());
                for (int j = 0; j < range; j++) {

                    /*if (!userJamoList.get(i).get(j).get(2).get(0).equals(textBookJamoList.get(i).get(j).get(2).get(0))) {
                        continue;
                    }*/
                    if (textBookJamoList.get(i).get(j).get(2).get(0)==-1 || userJamoList.get(i).get(j).get(2).get(0)==-1) {
                        continue;
                    }

                    for (int k = 0; k < 3; k++) {
                        //(w/h)로 비교
                        //k=0: 자음, k=1: 모음, k=2: 받침
                        if ((double) (textBookJamoList.get(i).get(j).get(k).get(2) / textBookJamoList.get(i).get(j).get(k).get(3)) /
                                (double) (userJamoList.get(i).get(j).get(k).get(2) / userJamoList.get(i).get(j).get(k).get(3)) > 1.5
                                || (double) (textBookJamoList.get(i).get(j).get(k).get(2) / textBookJamoList.get(i).get(j).get(k).get(3)) /
                                (double) (userJamoList.get(i).get(j).get(k).get(2) / userJamoList.get(i).get(j).get(k).get(3)) < 0.5
                        ) {
                            score -= 1;
                            int x456 = userSyllableList.get(i).get(j).get(0) + userSyllableList.get(i).get(j).get(2) / 2;
                            int y456 = userSyllableList.get(i).get(j).get(1) - 10;

                            Feedback feedback = new Feedback(score, k + 4, x456, y456, i);
                            feedbacks.add(feedback);
                            //log.info("feedback: fidx={}::x={}::y={}::line={}", feedback.getFidx(), feedback.getX(), feedback.getY(), feedback.getLine());
                        }
                    }
                }

            }
        }

        //점수가 음수일때, 점수가 100점일때 정리 - null반환보다는 나을듯?

        if(score<0){ //음수일때
            score=0;
            feedbacks.add(new Feedback(0,-1,-1,-1,-1));
            log.info("feedback: {}", 0);
        }
        else if(score==100 && !flag0){ //아예 안 쓴 경우
            feedbacks.add(new Feedback(0,-2,-1,-1,-1));
        }
        else if(score==100){ //100점일때
            //score=100;
            feedbacks.add(new Feedback(100,-1,-1,-1,-1));
            log.info("feedback: {}", 100);
        }

        //점수 DB에 저장 - 안 쓴 경우 제외-db에 저장x
        if(flag0) {
            recordRepository.updateScore(score, imageName);
            log.info("score: {}", score);
        }

        String json = gson.toJson(feedbacks);
        feedbacks.clear();
        return json;
    }
}
