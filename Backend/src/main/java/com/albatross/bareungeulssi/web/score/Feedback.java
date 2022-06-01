package com.albatross.bareungeulssi.web.score;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

@Getter
@Setter
public class Feedback {

    //점수 계산할 때 필요한 항목
    //imageName, fontPath, literatureId, textBookAnalysis, UserAnalysis, score
    //fontSize는 나중에 유동적인 걸로 바꾸기

    private int fidx;
    private int x;
    private int y;
    private int score;
    private int line;

    public Feedback(){

    }

    @Builder
    public Feedback(int score, int fidx, int x, int y, int line){
        this.score = score;
        this.fidx = fidx;
        this.x = x;
        this.y = y;
        this.line = line;
    }

}
