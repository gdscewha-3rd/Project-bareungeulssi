package com.albatross.bareungeulssi.web.aws;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller

public class AwsS3HomeController {

    @GetMapping("/image")
    public String AwsS3Home() {
        return "image";
    }
}
