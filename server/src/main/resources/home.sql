/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Version : 50624
 Source Host           : localhost
 Source Database       : home

 Target Server Version : 50624
 File Encoding         : utf-8

 Date: 04/27/2015 16:25:55 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

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
INSERT INTO `course_student` VALUES ('1', 'nihao'), ('1', 'wangpengchao');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `department`
-- ----------------------------
BEGIN;
INSERT INTO `department` VALUES ('7', '0', '1', '中山大学', '<p>是打发</p>', '广东省广州市'), ('8', '7', '2', '资讯管理系', null, '收到'), ('9', '8', '3', '信息管理与信息系统', null, '收到'), ('10', null, '1', '全部', '代表全部学校的根节点', null);
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
INSERT INTO `menu` VALUES ('1', '首页', null, 'link', 'main.main', '0'), ('2', '系统管理', null, 'heading', '', '0'), ('3', '用户维护', '2', 'toggle', null, '0'), ('4', '学校管理', '3', 'link', 'main.dep.list', '0'), ('5', '用户管理', '3', 'link', 'main.user.list', '0'), ('6', '我的工作', '2', 'toggle', null, '0'), ('7', '课程管理', '6', 'link', 'main.course.list', '0'), ('8', '我的题目', '6', 'link', 'main.title.list', '0');
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
  `content` text COLLATE utf8_bin NOT NULL,
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `initiator` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

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
INSERT INTO `user` VALUES ('nihao', null, null, null, null, null, null, '你好', '202cb962ac59075b964b07152d234b70', '0', 'dsfdsfkl', null, null, '0', null, null), ('wangpengchao', null, null, null, null, null, '0:0:0:0:0:0:0:1', '王鹏超', '202cb962ac59075b964b07152d234b70', '0', '123', null, 'tmSj8d0krWjc3B961EgBhwK1Go8hm3EkOgyAOPMNdb63zLAkDPtw9eBZvAdppiaardyd80fGfEI/uL26K6UOJSIvWI9tzNTU0htJKqBm7OjmiZ96b1cMHObcsWRxWAmJP6BkL5AtG7nWhEetcQv6Ig==', '0', '7', '0'), ('xiaohua', null, null, null, null, null, '0:0:0:0:0:0:0:1', '笑话', '202cb962ac59075b964b07152d234b70', '0', '2332', null, 'v6nScNj3NOFt90tvfU6AL/f3abEwrljeKzDr2KC2xp3Thf0EgWI6leqIBp0wpKKEC3DGQUulk2TZkn3XnoeKXje3XK1Q7Y+4KyKQ9gyq5zoKQiKOjGKpB7tf4D2pz2tBraMzwjPw1ZS3xklEgN9Cwg==', '1', null, null);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
