/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50624
 Source Host           : localhost
 Source Database       : home

 Target Server Type    : MySQL
 Target Server Version : 50624
 File Encoding         : utf-8

 Date: 05/21/2015 19:25:57 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `Arrange`
-- ----------------------------
DROP TABLE IF EXISTS `Arrange`;
CREATE TABLE `Arrange` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `courseIds` varchar(255) DEFAULT NULL,
  `userIds` varchar(255) DEFAULT NULL,
  `examId` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `teach` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_isljdf38kcoivil5fm11tumbt` (`teach`),
  CONSTRAINT `FK_isljdf38kcoivil5fm11tumbt` FOREIGN KEY (`teach`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `Arrange`
-- ----------------------------
BEGIN;
INSERT INTO `Arrange` VALUES ('1', '1', '', '5', '期末试卷', 'xiaohua'), ('2', '', 'wangpengchao', '5', '测试', 'xiaohua'), ('3', '', 'wangpengchao', '5', '测试', 'xiaohua'), ('4', '', 'wangpengchao', '5', '测试', 'xiaohua'), ('5', '', 'wangpengchao', '5', '测试', 'xiaohua'), ('6', '', 'wangpengchao', '5', '测试', 'xiaohua'), ('7', '', 'wangpengchao', '5', '测试', 'xiaohua'), ('8', '', 'wangpengchao', '5', '测试', 'xiaohua'), ('9', '', 'wangpengchao', '5', '测试', 'xiaohua');
COMMIT;

-- ----------------------------
--  Table structure for `BigTitle`
-- ----------------------------
DROP TABLE IF EXISTS `BigTitle`;
CREATE TABLE `BigTitle` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `percent` int(11) NOT NULL,
  `examination` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `BigTitle`
-- ----------------------------
BEGIN;
INSERT INTO `BigTitle` VALUES ('1', '单选题', '0', '6', '4'), ('2', '单选题', '0', '5', '5'), ('3', '多选题', '1', '10', '5'), ('4', '简答题', '2', '10', '5'), ('5', '论述题', '4', '10', '5');
COMMIT;

-- ----------------------------
--  Table structure for `BigTitle_Title`
-- ----------------------------
DROP TABLE IF EXISTS `BigTitle_Title`;
CREATE TABLE `BigTitle_Title` (
  `bigId` int(11) NOT NULL,
  `titleId` int(11) NOT NULL,
  PRIMARY KEY (`bigId`,`titleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `BigTitle_Title`
-- ----------------------------
BEGIN;
INSERT INTO `BigTitle_Title` VALUES ('1', '2'), ('1', '6'), ('2', '2'), ('2', '6'), ('2', '8'), ('2', '9'), ('2', '13'), ('2', '14'), ('2', '15'), ('2', '16'), ('2', '17'), ('2', '18'), ('2', '19'), ('2', '21'), ('3', '1'), ('3', '6'), ('3', '13'), ('3', '14'), ('3', '15'), ('3', '16'), ('4', '12'), ('4', '13'), ('5', '9');
COMMIT;

-- ----------------------------
--  Table structure for `Examination`
-- ----------------------------
DROP TABLE IF EXISTS `Examination`;
CREATE TABLE `Examination` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `initiator` varchar(255) DEFAULT NULL,
  `percent` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ewwxf19xnm00fj42mf1gv2k9l` (`initiator`),
  CONSTRAINT `FK_ewwxf19xnm00fj42mf1gv2k9l` FOREIGN KEY (`initiator`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `Examination`
-- ----------------------------
BEGIN;
INSERT INTO `Examination` VALUES ('1', '发呆是发呆', 'xiaohua', '12'), ('2', '发呆是发呆', 'xiaohua', '12'), ('3', '发呆是发呆', 'xiaohua', '12'), ('4', '发呆是发呆', 'xiaohua', '12'), ('5', '测试', 'xiaohua', '150');
COMMIT;

-- ----------------------------
--  Table structure for `Respondent`
-- ----------------------------
DROP TABLE IF EXISTS `Respondent`;
CREATE TABLE `Respondent` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userArrangeId` int(11) DEFAULT NULL,
  `bigTitleId` int(11) DEFAULT NULL,
  `titleId` int(11) DEFAULT NULL,
  `answer` varchar(255) NOT NULL DEFAULT '',
  `percent` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `Respondent`
-- ----------------------------
BEGIN;
INSERT INTO `Respondent` VALUES ('1', '1', '2', '2', '6', '5'), ('2', '1', '2', '6', '1', '0'), ('3', '1', '2', '8', ' ', '0'), ('4', '1', '2', '9', '12', '0'), ('5', '1', '2', '13', ' ', '0'), ('6', '1', '2', '14', ' ', '0'), ('7', '1', '2', '15', ' ', '0'), ('8', '1', '2', '16', ' ', '0'), ('9', '1', '2', '17', ' ', '0'), ('10', '1', '2', '18', ' ', '0'), ('11', '1', '2', '19', ' ', '0'), ('12', '1', '2', '21', ' ', '0'), ('13', '1', '3', '1', '', '0'), ('14', '1', '3', '6', '', '0'), ('15', '1', '3', '13', '', '0'), ('16', '1', '3', '14', '', '0'), ('17', '1', '3', '15', '', '0'), ('18', '1', '3', '16', '', '0'), ('19', '1', '4', '12', ' ', '10'), ('20', '1', '4', '13', ' ', '0'), ('21', '1', '5', '9', '12', '0');
COMMIT;

-- ----------------------------
--  Table structure for `UserArrange`
-- ----------------------------
DROP TABLE IF EXISTS `UserArrange`;
CREATE TABLE `UserArrange` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `arrange` int(11) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL COMMENT '状态 0代表默认  1代表已经提交 2代表已经审阅',
  `course` int(11) DEFAULT NULL,
  `teach` varchar(255) DEFAULT NULL,
  `percent` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3f8526jl49qi0b4boehj0uwej` (`teach`),
  KEY `FK_iihsoxugimdmomqm95cfb8gj1` (`user`),
  CONSTRAINT `FK_3f8526jl49qi0b4boehj0uwej` FOREIGN KEY (`teach`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_iihsoxugimdmomqm95cfb8gj1` FOREIGN KEY (`user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `UserArrange`
-- ----------------------------
BEGIN;
INSERT INTO `UserArrange` VALUES ('1', '9', 'wangpengchao', '2', null, 'xiaohua', '15');
COMMIT;

-- ----------------------------
--  Table structure for `answer`
-- ----------------------------
DROP TABLE IF EXISTS `answer`;
CREATE TABLE `answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) COLLATE utf8_bin NOT NULL,
  `user` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `title` int(4) DEFAULT NULL,
  `correct` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `answer`
-- ----------------------------
BEGIN;
INSERT INTO `answer` VALUES ('1', '收费方式', 'xiaohua', '6', '1'), ('2', 'sfsfa', 'xiaohua', '1', '1'), ('3', '山东省的颠三倒四', 'xiaohua', '1', '1'), ('4', 'sdsdfsfdsfa', 'xiaohua', '1', '0'), ('5', '山东省颠三倒四的', 'xiaohua', '1', '1'), ('6', '这个是答案', 'xiaohua', '2', '1'), ('7', '朝夕相处的 v 出现许多 v 许多是', 'xiaohua', '2', null), ('8', 'sdsdsdsddssd', 'xiaohua', '8', null), ('9', 'sdsddssd', 'xiaohua', '8', null), ('10', 'dssdssd', 'xiaohua', '8', null), ('11', 'sdsddsds', 'xiaohua', '8', '1'), ('12', 'sdsdsdsddssd', 'xiaohua', '9', null), ('13', 'sdsddssd', 'xiaohua', '9', null), ('14', 'dssdssd', 'xiaohua', '9', null), ('15', 'sdsddsds', 'xiaohua', '9', '1'), ('16', 'sdsddssdd', 'xiaohua', '11', null), ('17', 'sdsddsds', 'xiaohua', '11', null), ('18', 'dsdsdssdsd', 'xiaohua', '11', null), ('19', '发呆发发呆发呆发呆', 'xiaohua', '12', '0'), ('20', '发呆发发呆发呆发呆', 'xiaohua', '13', '0'), ('21', '发呆大大方方大大方方的', 'xiaohua', '13', '1'), ('22', 'sdsdsdsdsdsd', 'xiaohua', '14', null), ('23', 'sdsdsdsdsd', 'xiaohua', '14', '1'), ('24', '师傅说师傅', 'xiaohua', '15', null), ('25', '师傅说师傅', 'xiaohua', '15', '1'), ('26', '双方山东省分', 'xiaohua', '15', null), ('27', '沙发沙发沙发', 'xiaohua', '15', null), ('28', '说师傅的师傅', 'xiaohua', '16', null), ('29', '沙发沙发水电费', 'xiaohua', '16', null), ('30', '说师傅师傅的身份', 'xiaohua', '16', null), ('31', '沙发沙发电视', 'xiaohua', '16', '1'), ('32', '沙发沙发水电费', 'xiaohua', '17', null), ('33', '沙发是发呆是发呆沙发', 'xiaohua', '17', '1'), ('34', '但是非法所得的沙发', 'xiaohua', '17', null), ('35', '沙发水电费但是水电费', 'xiaohua', '17', null), ('36', '沙发颠三倒四', 'xiaohua', '18', null), ('37', '颠三倒四的沙发的沙发', 'xiaohua', '18', null), ('38', '沙发上的水电费', 'xiaohua', '18', '1'), ('39', '的说师傅的师傅', 'xiaohua', '18', null), ('40', '是沙发水电费', 'xiaohua', '19', '1'), ('41', '说师傅师傅', 'xiaohua', '19', null), ('42', '说的沙发水电费', 'xiaohua', '19', null), ('43', '但是水电费的沙发', 'xiaohua', '19', null), ('44', '沙发的方式沙发的水电费', 'xiaohua', '20', '1'), ('45', '分身乏术颠三倒四分', 'xiaohua', '20', null), ('46', '的沙发水电费水电费', 'xiaohua', '20', null), ('47', '水电费水电费的沙发', 'xiaohua', '20', null), ('48', '沙发说师傅的师傅分', 'xiaohua', '21', null), ('49', '是非颠倒沙发大方水电费说', 'xiaohua', '21', null), ('50', '的沙发水电费的沙发', 'xiaohua', '21', null), ('51', '水电费师傅的师傅', 'xiaohua', '21', '1');
COMMIT;

-- ----------------------------
--  Table structure for `course`
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `teach` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ppeepe6tj4uxxky3ere1out75` (`teach`),
  CONSTRAINT `FK_ppeepe6tj4uxxky3ere1out75` FOREIGN KEY (`teach`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `course`
-- ----------------------------
BEGIN;
INSERT INTO `course` VALUES ('1', '数学', '必修', 'xiaohua'), ('2', 'dsdsds', '选修', 'xiaohua'), ('3', 'sddssd', '选修', 'xiaohua'), ('4', 'dsdsfdfs', '选修', 'xiaohua'), ('5', 'dsdsfdsf', '选修', 'xiaohua');
COMMIT;

-- ----------------------------
--  Table structure for `course_student`
-- ----------------------------
DROP TABLE IF EXISTS `course_student`;
CREATE TABLE `course_student` (
  `courseId` int(11) NOT NULL,
  `student` varchar(255) NOT NULL,
  KEY `FK_hq7xdn7x869ig3nx96s8xanm7` (`student`),
  CONSTRAINT `FK_hq7xdn7x869ig3nx96s8xanm7` FOREIGN KEY (`student`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `course_student`
-- ----------------------------
BEGIN;
INSERT INTO `course_student` VALUES ('1', 'wangpengchao'), ('1', 'nihao');
COMMIT;

-- ----------------------------
--  Table structure for `department`
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `type` int(255) unsigned DEFAULT '1' COMMENT '类型 1 学校 2：院系 3：专业 4：班级',
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `department`
-- ----------------------------
BEGIN;
INSERT INTO `department` VALUES ('7', '0', '1', '中山大学', '<p>是打发</p>', '广东省广州市'), ('8', '7', '2', '资讯管理系', null, '收到'), ('9', '8', '3', '信息管理与信息系统', '<p>山东省的颠三倒四颠三倒四分</p>', '收到'), ('10', null, '1', '全部', '代表全部学校的根节点', null), ('11', '10', '2', '山东省时代', '<p>山东省舒服是淡淡的说</p>', '说到底是');
COMMIT;

-- ----------------------------
--  Table structure for `menu`
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `pid` int(11) unsigned DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `power` tinyint(4) DEFAULT '0' COMMENT '0:代表都可以查看 1:代表管理员可以查看 2:代表老师可以查看 4:代表学生可以查看',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `menu`
-- ----------------------------
BEGIN;
INSERT INTO `menu` VALUES ('1', '首页', null, 'link', 'main.main', '0'), ('2', '系统管理', null, 'heading', '', '0'), ('3', '用户维护', '2', 'toggle', null, '0'), ('4', '学校管理', '3', 'link', 'main.dep.list', '0'), ('5', '用户管理', '3', 'link', 'main.user.list', '0'), ('6', '我的工作', '2', 'toggle', null, '0'), ('7', '课程管理', '6', 'link', 'main.course.list', '2'), ('8', '我的题目', '6', 'link', 'main.title.list', '2'), ('9', '我的试卷', '6', 'link', 'main.exam.list', '2'), ('10', '未做作业', '6', 'link', 'main.work.list', '1'), ('11', '已交作业', '6', 'link', 'main.work.submits', '1'), ('12', '作业历史', '6', 'link', 'main.work.histories', '1'), ('13', '批改作业', '6', 'link', 'main.work.corrects', '2');
COMMIT;

-- ----------------------------
--  Table structure for `subject`
-- ----------------------------
DROP TABLE IF EXISTS `subject`;
CREATE TABLE `subject` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL COMMENT '科目名字',
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `title`
-- ----------------------------
DROP TABLE IF EXISTS `title`;
CREATE TABLE `title` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(255) COLLATE utf8_bin NOT NULL,
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `initiator` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `title`
-- ----------------------------
BEGIN;
INSERT INTO `title` VALUES ('1', '你好', '老师了罚款了罚款了看来反馈来看了', 'xiaohua'), ('2', '是考虑到了康师傅', null, 'xiaohua'), ('3', '是考虑到了康师傅', null, 'xiaohua'), ('4', 'SD卡克里斯丁', '舒服舒服舒服', 'xiaohua'), ('5', '实打实的第三方', '舒服舒服的水电费', 'xiaohua'), ('6', '范德萨发生', '双方的发生的', 'xiaohua'), ('7', 'sddssd', 'dsdsdsds', 'xiaohua'), ('8', 'sdsdsddsds', 'sdsddsdsds', 'xiaohua'), ('9', '但是山东省颠三倒四的的', 'sdsddsdsds', 'xiaohua'), ('10', '232323', 'sdsdsdsd', 'xiaohua'), ('11', 'qwsddasfsaf', 'sdsdfdsfdsf', 'xiaohua'), ('12', '等待 v 是 v 是 v', '山东分身乏术的', 'xiaohua'), ('13', '等待 v 是 v 是 v', '山东分身乏术的', 'xiaohua'), ('14', 'sdsdvsdsvds', 'sdsdsdsdsdsd', 'xiaohua'), ('15', '沙发沙发沙发上', '水电费沙发上', 'xiaohua'), ('16', '是沙发沙发沙发', '说师傅师傅', 'xiaohua'), ('17', '沙发沙发沙发', '沙发发生水电费', 'xiaohua'), ('18', '沙发上水电费时代', '是大是大非的沙发', 'xiaohua'), ('19', '说师傅的师傅', '沙发沙发水电费', 'xiaohua'), ('20', '舒舒服服说师傅的', '沙发的水电费水电费', 'xiaohua'), ('21', '说师傅的师傅颠倒是非', '沙发沙发水电费', 'xiaohua');
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `admissionTime` datetime(6) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `birthday` datetime(6) DEFAULT NULL,
  `createdate` datetime(6) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `sex` tinyint(4) NOT NULL,
  `sn` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `depId` int(11) DEFAULT '0',
  `subjectId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('nihao', null, null, null, null, null, null, '你好', '202cb962ac59075b964b07152d234b70', '0', 'dsfdsfkl', null, null, '0', null, null), ('wangpengchao', null, null, null, null, null, '192.168.0.15', '王鹏超', '202cb962ac59075b964b07152d234b70', '0', '123', null, 'tmSj8d0krWjc3B961EgBhwK1Go8hm3EkOgyAOPMNdb63zLAkDPtw9eBZvAdppiaardyd80fGfEI/uL26K6UOJX1FgNum2Gm1VxqrPyArZflUQA8ESDkLpWk9zMBrG8tmIiwa6DzJdearNj4eNSAK/A==', '0', '7', '0'), ('xiaohua', null, null, null, null, null, '192.168.0.15', '笑话', '202cb962ac59075b964b07152d234b70', '0', '2332', null, 'v6nScNj3NOFt90tvfU6AL/f3abEwrljeKzDr2KC2xp3Thf0EgWI6leqIBp0wpKKElhgDrmaSiTIRjgSSk3qoQ7pg8FeSe8HBG+S1p0hdp8y232gELSv7OuaEWgkuMtqHPy/1sc4b65gml+tfPfN+8g==', '1', '7', null);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
