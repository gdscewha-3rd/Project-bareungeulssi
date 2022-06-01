package com.albatross.bareungeulssi.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity(name="literature")
@Table(name="literature")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Literature {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //작품 번호

    @Column(name="title", nullable = false, length = 500)
    private String title;

    @Column(name="author", nullable = false, length = 500)
    private String author;

//    @Lob
//    @Column(name="plot", nullable = false)
//    private String plot;

//    @Column(name="link", length = 500)
//    private String link; //s3에 있는 파일 주소

//    @Column(name="checkNew")
//    private Boolean checkNew; //new인지
//
//    @Column(name="checkBest")
//    private Boolean checkBest; //best인지

}
