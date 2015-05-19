package com.homework.controller;

import com.google.common.collect.Multimap;
import com.homework.core.IResult;
import com.homework.core.Result;
import com.homework.core.controller.BaseController;
import com.homework.core.controller.BaseControllerImpl;
import com.homework.core.service.BaseService;
import com.homework.entity.Answer;
import com.homework.entity.Title;
import com.homework.entity.TitleAdd;
import com.homework.entity.User;
import com.homework.service.AnswerService;
import com.homework.service.TitleService;
import com.homework.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Created by 田黄雪薇 on 15/4/26.
 */
@RestController
@RequestMapping("title")
public class TitleController extends BaseControllerImpl<Title, Integer> implements BaseController<Title, Integer> {
    @Autowired
    TitleService titleService;
    @Resource
    UserService userService;
    @Resource
    AnswerService answerService;

    @Override
    public <D extends BaseService<Title, Integer>> D getService() {
        return (D) titleService;
    }


    @ResponseBody
    @RequestMapping(method = RequestMethod.POST)
    public Result create(@RequestBody TitleAdd entity) {
        return Result.getResult(() -> {
            Title title = new Title();
            title.setContent(entity.getContent());
            title.setDescription(entity.getDescription());
            User user = new User();
            user.setId(entity.getInitiator());
            user = userService.uniqueResult(user);
            title.setInitiator(user);
            Integer id = titleService.create(title);
            title.setId(id);
            for (TitleAdd.AnswerAdd add : entity.getAnswers()) {
                Answer answer = new Answer();
                answer.setContent(add.getContent());
                answer.setCorrect(add.isCorrect());
                answer.setTitle(title);
                answer.setUser(user);
                answerService.create(answer);
            }
            return id;
        });
    }

    @ResponseBody
    @RequestMapping(value = "/{id}/answer", method = RequestMethod.POST)
    public Result addAnswer(@RequestBody List<TitleAdd.AnswerAdd> answerAdds, @PathVariable("id")Integer id) {
        return Result.getResult(new IResult() {
            @Override
            public Object query() throws Exception {
                Title title = titleService.firstResult(new Title(id));
                User user = null;
                if (answerAdds.size() > 0) {
                    user = userService.firstResult(new User(answerAdds.get(0).getUserId()));
                }
                for (TitleAdd.AnswerAdd answerAdd : answerAdds) {
                    Answer answer = new Answer();
                    answer.setContent(answerAdd.getContent());
                    answer.setCorrect(answerAdd.isCorrect());
                    answer.setTitle(title);
                    answer.setUser(user);
                    answerService.create(answer);
                }
                return answerAdds.size();
            }
        });

    }
}
