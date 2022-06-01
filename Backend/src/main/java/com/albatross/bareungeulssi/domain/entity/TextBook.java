package com.albatross.bareungeulssi.domain.entity;

import com.albatross.bareungeulssi.domain.converter.JsonStringConverter;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Map;

@Entity(name="textbook")
@Table(name="textbook")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TextBook {

    //교본 분석 결과 저장할 테이블

    @Id
    @Column(name = "textbook_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long textbookId;

    @Column(name = "literature_id", nullable = false)
    private Long literatureId;

    @Column(name = "page")
    private Integer page;

    @Column(name = "font_path", nullable = false)
    private String fontPath;

    //교본 분석 결과 저장할 곳
    @Convert(converter = JsonStringConverter.class)
    @Column(columnDefinition = "longtext", name = "textbook_analysis")
    private Map<String, Object> textBookAnalysis;

}
