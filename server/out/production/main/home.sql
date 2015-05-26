/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Version : 50624
 Source Host           : localhost
 Source Database       : home

 Target Server Version : 50624
 File Encoding         : utf-8

 Date: 04/13/2015 13:20:23 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `Course`
-- ----------------------------
DROP TABLE IF EXISTS `Course`;
CREATE TABLE `Course` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL COMMENT '名字',
  `type` varchar(255) NOT NULL COMMENT '类型 必修 选修 公开课',
  `teach` varchar(255) NOT NULL COMMENT '教师',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `CourseStudent`
-- ----------------------------
DROP TABLE IF EXISTS `CourseStudent`;
CREATE TABLE `CourseStudent` (
  `id` int(11) NOT NULL,
  `student` varchar(255) NOT NULL COMMENT '学生',
  `courseId` int(11) NOT NULL COMMENT '课程',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `Department`
-- ----------------------------
DROP TABLE IF EXISTS `Department`;
CREATE TABLE `Department` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `type` int(255) unsigned DEFAULT '1' COMMENT '类型 1 学校 2：院系 3：专业 4：班级',
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `Department`
-- ----------------------------
BEGIN;
INSERT INTO `Department` VALUES ('0', null, '1', '全部', '代表全部学校的根节点', null), ('7', '0', '1', '中山大学', '<p>是打发</p>', '广东省广州市'), ('8', '7', '2', '资讯管理系', null, '收到'), ('9', '8', '3', '信息管理与信息系统', null, '收到');
COMMIT;

-- ----------------------------
--  Table structure for `Menu`
-- ----------------------------
DROP TABLE IF EXISTS `Menu`;
CREATE TABLE `Menu` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `pid` int(11) unsigned DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `Menu`
-- ----------------------------
BEGIN;
INSERT INTO `Menu` VALUES ('1', '首页', null, 'link', 'main.main'), ('2', '系统管理', null, 'heading', ''), ('3', '用户维护', '2', 'toggle', null), ('4', '学校管理', '3', 'link', 'main.dep.list'), ('5', '用户管理', '3', 'link', 'main.user.list');
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
INSERT INTO `user` VALUES ('wangpengchao', null, null, null, null, null, '0:0:0:0:0:0:0:1', '王鹏超', '202cb962ac59075b964b07152d234b70', '0', '123', null, 'tmSj8d0krWjc3B961EgBhwK1Go8hm3EkOgyAOPMNdb63zLAkDPtw9eBZvAdppiaapNdlX98lPrXlWJWFdMGk4PC73n8cmWvaiUzEM0aMsnbmiZ96b1cMHObcsWRxWAmJP6BkL5AtG7nWhEetcQv6Ig==', '0', '7', '0');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
