package com.homework.controller;

import com.homework.core.Result;
import com.homework.core.controller.BaseController;
import com.homework.core.controller.BaseControllerImpl;
import com.homework.core.service.BaseService;
import com.homework.entity.*;
import com.homework.service.RespondentService;
import com.homework.service.UserArrangeService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * Created by luqiao on 15/5/21.
 */
@RestController
@RequestMapping(value = "/userarrange")
public class UserArrangeController extends BaseControllerImpl<UserArrange, Integer> implements BaseController<UserArrange, Integer> {
    @Resource
    UserArrangeService userArrangeService;

    @Resource
    RespondentService respondentService;

    @Override
    public <D extends BaseService<UserArrange, Integer>> D getService() {
        return (D) userArrangeService;
    }

    @Override
    @ResponseBody
    @RequestMapping(value = "/{id}/respondent")
    public Result getById(@PathVariable("id") Integer integer) {
        return Result.getResult(() -> {
            UserArrange userArrange = userArrangeService.getById(integer);
            if (userArrange.getStatus() != 0) {
                Respondent query = new Respondent();
                query.setUserArrangeId(userArrange.getId());
                List<Respondent> respondents = respondentService.getList(query);
                List<BigTitle> titles = userArrange.getArrange().getExamination().getTitles();
                for (BigTitle bigTitle : titles) {
                    for (Title title : bigTitle.getTitles()) {
                        Respondent respondent = respondents.stream().filter(respondent1 -> respondent1.getBigTitleId().equals(bigTitle.getId()) && respondent1.getTitleId().equals(title.getId())).findFirst().get();
                        if (respondent != null) {
                            title.setAnswer(respondent.getAnswer());
                            title.setPercent(respondent.getPercent());
                            title.setRespondentId(respondent.getId());
                            if (bigTitle.getType() == 0) {
                                title.getAnswers().stream().filter(answer -> Objects.equals(answer.getId().toString(), respondent.getAnswer())).forEach(answer -> answer.setSelect(true));
                            }
                            if (userArrange.getStatus() == 1) {
                                if (bigTitle.getType() == 0) {
                                    long correct = title.getAnswers().stream().filter(answer -> answer.getSelect() && answer.isCorrect()).count();
                                    if (correct > 0) {
                                        title.setPercent(bigTitle.getPercent());
                                    }
                                }
                            }else if (bigTitle.getType() == 1) {
                                boolean result = title.getAnswers().stream().filter(answer -> answer.getSelect() && answer.isCorrect()).count() == title.getAnswers().stream().filter(answer -> answer.isCorrect()).count();
                                if (result) {
                                    title.setPercent(bigTitle.getPercent());
                                }
                            }
                        }
                    }
                }
            }
            return userArrange;
        });
    }

    @Override
    public Result getAll(HttpServletRequest request, HttpServletResponse response) {
        Map<String, String> params = getParams(request);
        UserArrange arrange = new UserArrange();
        if (params.containsKey("id")) {
            arrange.setId(Integer.parseInt(params.get("id")));
        }
        if (params.containsKey("user")) {
            arrange.setUser(new User(params.get("user")));
        }
        if (params.containsKey("status")) {
            arrange.setStatus(Integer.parseInt(params.get("status")));
        }
        if (params.containsKey("course")) {
            arrange.setCourse(new Course(Integer.parseInt(params.get("course"))));
        }
        if (params.containsKey("teach")) {
            arrange.setTeach(new User(params.get("teach")));
        }
        return Result.getResult(() -> {
            return UserArrangeController.this.getService().getList(arrange);
        });
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, value = "/{id}/respondent")
    public Result submitRespondent(@PathVariable("id") Integer id, @RequestBody List<Respondent> respondents) {
        return Result.getResult(() -> {
            respondentService.creates(respondents);
            UserArrange userArrange = userArrangeService.getById(id);
            userArrange.setStatus(1);
            userArrangeService.update(userArrange);
            return 1;
        });
    }
    @ResponseBody
    @RequestMapping(method = RequestMethod.PUT, value = "/{id}/respondent")
    public Result updateRespondent(@PathVariable("id") Integer id, @RequestBody List<Respondent> respondents) {
        return Result.getResult(() -> {
            Integer total = 0;
            for (Respondent respondent : respondents) {
                Respondent item = respondentService.getById(respondent.getId());
                item.setPercent(respondent.getPercent());
                total += respondent.getPercent();
                respondentService.update(item);
            }
            UserArrange userArrange = userArrangeService.getById(id);
            userArrange.setStatus(2);
            userArrange.setPercent(total);
            userArrangeService.update(userArrange);
            return 1;
        });
    }
}
