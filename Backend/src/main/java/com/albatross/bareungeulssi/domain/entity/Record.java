package com.albatross.bareungeulssi.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity(name="record")
@Table(name="record")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Record { //쓴 거 저장
    //레코드 아이디, 회원id, 작품id, 이미지 아이디(주소), 날짜, 점수
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="login_id", nullable = false)
    private String loginId;

    @Column(name="literature_id", nullable = false)
    private Long literatureId;

    @Column(name="page")
    private Integer page;

    @Column(name = "image_name")
    private String imageName;

    @Column(name="date")
    private LocalDateTime date;

    @Column(name="score")
    private Integer score;

    @Builder
    public Record(String loginId, Long literatureId, Integer page, String imageName, LocalDateTime date, Integer score){
        this.loginId = loginId;
        this.literatureId = literatureId;
        this.page = page;
        this.imageName=imageName;
        this.date=date;
        this.score=score;
    }
}
