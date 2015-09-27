-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 14, 2014 at 01:29 AM
-- Server version: 5.5.40-0ubuntu1
-- PHP Version: 5.3.10-1ubuntu3.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `readerin`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
`id` bigint(20) NOT NULL,
  `user` bigint(20) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `publisher` bigint(20) NOT NULL,
  `publisherSuperAdmin` tinyint(1) DEFAULT NULL,
  `systemSuperAdmin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `user`, `time`, `publisher`, `publisherSuperAdmin`, `systemSuperAdmin`) VALUES
(6, 1, '2014-12-08 18:14:07', 1, 1, 0),
(7, 3, '2014-12-10 00:38:14', 52, 1, 0),
(8, 3, '2014-12-10 00:39:43', 52, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `appkey`
--

CREATE TABLE IF NOT EXISTS `appkey` (
`id` bigint(20) NOT NULL,
  `key` text COLLATE utf8_unicode_ci NOT NULL COMMENT '应用秘钥',
  `usage` text COLLATE utf8_unicode_ci NOT NULL COMMENT '秘钥用途'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `appkey`
--

INSERT INTO `appkey` (`id`, `key`, `usage`) VALUES
(1, '613713FB424F71022C6B898A9846FABE', 'rtm移动客户端');

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE IF NOT EXISTS `city` (
`id` int(11) NOT NULL COMMENT '城市ID',
  `name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '城市名称',
  `province` mediumint(9) NOT NULL COMMENT '所属省份'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`id`, `name`, `province`) VALUES
(1, '北京', 1);

-- --------------------------------------------------------

--
-- Table structure for table `district`
--

CREATE TABLE IF NOT EXISTS `district` (
`id` int(11) NOT NULL COMMENT '区县ID',
  `name` text COLLATE utf8_unicode_ci NOT NULL COMMENT '区县名称',
  `city` mediumint(9) NOT NULL COMMENT '从属城市'
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `district`
--

INSERT INTO `district` (`id`, `name`, `city`) VALUES
(1, '东城', 1),
(2, '西城', 1),
(3, '东城', 1),
(4, '西城', 1),
(5, '朝阳', 1),
(6, '丰台', 1),
(7, '石景山', 1),
(8, '海淀', 1),
(9, '门头沟', 1),
(10, '房山', 1),
(11, '大兴', 1),
(12, '昌平', 1),
(13, '顺义', 1),
(14, '通州', 1),
(15, '延庆县', 1),
(16, '怀柔区', 1),
(17, '平谷区', 1),
(18, '密云县', 1);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE IF NOT EXISTS `feedback` (
`ID` bigint(20) NOT NULL COMMENT '反馈ID',
  `magazine` bigint(20) NOT NULL COMMENT '反馈接刊物',
  `email` text COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci COMMENT '内容',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '时间',
  `IPAddress` text COLLATE utf8_unicode_ci NOT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否处理'
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`ID`, `magazine`, `email`, `content`, `time`, `IPAddress`, `isProcessed`) VALUES
(20, 4, 'harryliu@readerin.com', '多出几本新的', '2014-11-23 22:54:23', '130.215.121.109', 0),
(21, 1, 'harryliu@readerin.com', 'insight1', '2014-11-23 22:55:19', '130.215.121.109', 0),
(22, 3, 'harryliu@readerin.com', 'insight2', '2014-11-23 22:55:41', '130.215.121.109', 0),
(23, 2, 'harryliu@readerin.com', 'try', '2014-11-23 22:56:02', '130.215.121.109', 0),
(24, 2, 'harryliu@readerin.com', 'try', '2014-11-23 22:56:10', '130.215.121.109', 0),
(25, 2, 'harryliu@readerin.com', 'try', '2014-11-23 22:56:18', '130.215.121.109', 0);

-- --------------------------------------------------------

--
-- Table structure for table `keyWord`
--

CREATE TABLE IF NOT EXISTS `keyWord` (
`id` bigint(20) NOT NULL,
  `mid` bigint(20) NOT NULL,
  `word` text COLLATE utf8_unicode_ci NOT NULL,
  `popularity` bigint(20) DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `keyWord`
--

INSERT INTO `keyWord` (`id`, `mid`, `word`, `popularity`) VALUES
(2, 135, 'insight', 0),
(3, 131, 'nsig', 0),
(4, 134, 'ni', 0),
(5, 131, '来真的', 0),
(6, 131, '真的来', 0),
(7, 135, 'Shiyan试验', 0),
(8, 1, 'a', 0),
(58, 131, 'try this one', 0),
(59, 131, 'asd', 0);

-- --------------------------------------------------------

--
-- Table structure for table `magazine`
--

CREATE TABLE IF NOT EXISTS `magazine` (
`id` bigint(20) NOT NULL COMMENT '刊物ID',
  `size` int(11) NOT NULL COMMENT '刊物页数',
  `series` bigint(20) DEFAULT NULL COMMENT '系列',
  `issue` mediumint(9) DEFAULT NULL,
  `createtime` datetime NOT NULL COMMENT '上传时间',
  `isnew` tinyint(1) NOT NULL COMMENT '最新上线',
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `magazine`
--

INSERT INTO `magazine` (`id`, `size`, `series`, `issue`, `createtime`, `isnew`, `status`) VALUES
(131, 80, 52, 1, '2014-11-29 01:33:56', 1, 0),
(134, 4, 52, 0, '2014-12-06 07:21:08', 1, 1),
(135, 2, 52, 0, '2014-12-06 07:22:51', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
`id` bigint(20) NOT NULL,
  `magazine` bigint(20) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `position` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=987 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `magazine`, `name`, `position`, `time`) VALUES
(891, 131, '00837743f1fb8d3915f6b9b075a7f065.jpg', 2, '2014-12-13 23:58:36'),
(892, 131, '56c6332cf4200aa784d86852c3da0fb3.jpg', 0, '2014-12-13 23:58:36'),
(893, 131, '9b17b597736e058defa2a7657ea408cd.jpg', 1, '2014-12-13 23:58:36'),
(894, 131, 'e848a04675679419fcb911b0f8cf6f43.jpg', 3, '2014-12-01 16:23:05'),
(895, 131, '6e87aca08044a5affc5983bd7815b77d.jpg', 4, '2014-11-29 06:34:00'),
(896, 131, '767fbd2c04fa69a5b3c0701e821db437.jpg', 5, '2014-11-29 06:34:00'),
(897, 131, '1adbd8ae5acf550652f6f0850c03232f.jpg', 6, '2014-11-29 06:34:01'),
(898, 131, '20aa5605e916476333095681f1fdf3d8.jpg', 7, '2014-11-29 06:34:01'),
(899, 131, '09db92e2595a16a0eb39160bb1612a53.jpg', 8, '2014-11-29 06:34:02'),
(900, 131, '18d014053c55d85497afab2f65f227db.jpg', 9, '2014-11-29 06:34:02'),
(901, 131, '6869626028a83f567c8e091fbf4a31da.jpg', 10, '2014-11-29 06:34:03'),
(902, 131, '19b13aa3f0b4f7f7ad6259448d3e2535.jpg', 11, '2014-11-29 06:34:03'),
(903, 131, '3171d67800845fab4d2ffaf7f11d0619.jpg', 12, '2014-11-29 06:34:03'),
(904, 131, '67710b18f915f084155919e70d9dcf68.jpg', 13, '2014-11-29 06:34:04'),
(905, 131, '870ee1e0d5cafb2716022afcf83ad447.jpg', 14, '2014-11-29 06:34:05'),
(906, 131, '214047bb514a579542b017b7fcbbe2fe.jpg', 15, '2014-11-29 06:34:05'),
(907, 131, 'e8e80a602a5fd9c33817c9554c930c0c.jpg', 16, '2014-11-29 06:34:06'),
(908, 131, '8cc8eb132d5136de19e379943a12f908.jpg', 17, '2014-11-29 06:34:07'),
(909, 131, '4d1739b2f7e78205301709295d64f57b.jpg', 18, '2014-11-29 06:34:07'),
(910, 131, '75b95c45c17fffb2801eb935bdb2cf4a.jpg', 19, '2014-11-29 06:34:08'),
(911, 131, '0ea23c5789b23ddb9a39ec49326cca9d.jpg', 20, '2014-11-29 06:34:09'),
(912, 131, 'e684b26c9bb6db2c8ffbc9f2c9482f4f.jpg', 21, '2014-11-29 06:34:09'),
(913, 131, '2ae9d6526202d920f90546e7c4a3d7de.jpg', 22, '2014-11-29 06:34:10'),
(914, 131, '0c2a36ff5f5acaa4fec6241694cd6547.jpg', 23, '2014-11-29 06:34:11'),
(915, 131, 'f9d1e976bc503d80d4bfb654fb012e4f.jpg', 24, '2014-11-29 06:34:12'),
(916, 131, '1e5ba95184ee493f930c87b1e616bdce.jpg', 25, '2014-11-29 06:34:12'),
(917, 131, 'ff14d6a20afb841400ef8384d9febc0a.jpg', 26, '2014-11-29 06:34:12'),
(918, 131, '19704fa5b4de22ac37cb926bcddee84a.jpg', 27, '2014-11-29 06:34:13'),
(919, 131, '6ee793105636ad56df775ac7450a1dbc.jpg', 28, '2014-11-29 06:34:13'),
(920, 131, '39e7bf5c0fc6f18f5f6de061345f30f8.jpg', 29, '2014-11-29 06:34:14'),
(921, 131, '17936cfb12e11fc91cb7efcab869fa2b.jpg', 30, '2014-11-29 06:34:15'),
(922, 131, '5834d045759b777fbd6a697ece77a698.jpg', 31, '2014-11-29 06:34:15'),
(923, 131, 'c362cd7f447bccbbbeb3afb7b90bc89b.jpg', 32, '2014-11-29 06:34:15'),
(924, 131, '943b26ae8445b105c9fc9aaff9885978.jpg', 33, '2014-11-29 06:34:16'),
(925, 131, 'df6ffe5b1857b8190ae9beacdc25db40.jpg', 34, '2014-11-29 06:34:16'),
(926, 131, '38afe8b91b892d69c263c9d9bb4bae29.jpg', 35, '2014-11-29 06:34:17'),
(927, 131, 'cdb3723286a0094eee9397f616d59cdb.jpg', 36, '2014-11-29 06:34:17'),
(928, 131, '9767c4e61c30c6d6f005441168938e3d.jpg', 37, '2014-11-29 06:34:18'),
(929, 131, 'bf9f7606400219fa7578867018a17ff0.jpg', 38, '2014-11-29 06:34:18'),
(930, 131, 'ac12c530b930031270a39dc137c4cb47.jpg', 39, '2014-11-29 06:34:18'),
(931, 131, 'b15c825d275f0dd85a4a87e362fb777a.jpg', 40, '2014-11-29 06:34:19'),
(932, 131, 'f2cfea02bafa616d99a20339e07d39c3.jpg', 41, '2014-11-29 06:34:19'),
(933, 131, 'd2da6a076989a803120271902f540585.jpg', 42, '2014-11-29 06:34:19'),
(934, 131, '92e2088197eff61c67aca9c1f4f93159.jpg', 43, '2014-11-29 06:34:20'),
(935, 131, '0f3aa8e89bd7487306a869a4776454eb.jpg', 44, '2014-11-29 06:34:20'),
(936, 131, '8391b2f555c31c6faac908a986c8c552.jpg', 45, '2014-11-29 17:04:23'),
(937, 131, '6aed726ca4771d8e7c2370a4f39f1890.jpg', 46, '2014-11-29 17:04:23'),
(938, 131, '62f8ac5cbda2a322031882b66bdf4a81.jpg', 47, '2014-11-29 06:34:22'),
(939, 131, '8be3c0194d1e594f782452d3d8d34a15.jpg', 48, '2014-11-29 06:34:23'),
(940, 131, 'c4f064a8bd4c6ffe66936f1c75c298de.jpg', 49, '2014-11-29 06:34:24'),
(941, 131, 'f944b83b7ce1472270b4bd911542c1a3.jpg', 50, '2014-11-29 06:34:24'),
(942, 131, 'ea3778717ccd01b1a9b04e6c34f9c05a.jpg', 51, '2014-11-29 06:34:25'),
(943, 131, '42b4dfc139b9a505ca72a7e3be73513c.jpg', 52, '2014-11-29 06:34:25'),
(944, 131, '0f1505305938e2761939f5032bbfb99e.jpg', 53, '2014-11-29 06:34:26'),
(945, 131, 'a727a1d46446c21028b8c4bedb6da54f.jpg', 54, '2014-11-29 06:34:27'),
(946, 131, '8f63cac7ff389fca84d25db209c75446.jpg', 55, '2014-11-29 06:34:27'),
(947, 131, 'ee6f65d92eb6d7e6cfaeb067ddc0888c.jpg', 56, '2014-11-29 06:34:28'),
(948, 131, '6dc3d80cb8db47d3f6b931b88de1345c.jpg', 57, '2014-11-29 06:34:28'),
(949, 131, '6d60aa83919a30178549dbcb5aade794.jpg', 58, '2014-11-29 06:34:28'),
(950, 131, 'a98f11733a5714a76d1d02bbcc575687.jpg', 59, '2014-11-29 06:34:29'),
(951, 131, '563125f445f240691f349c7ffc4b4924.jpg', 60, '2014-11-29 06:34:29'),
(952, 131, 'ffee8ba05d256ba3ca745d7ae3a51c2b.jpg', 61, '2014-11-29 06:34:30'),
(953, 131, '7240b6562f37d63f5def7b49d794cb55.jpg', 62, '2014-11-29 06:34:31'),
(954, 131, '29c368f4ddc1e793589a1eafee4974f6.jpg', 63, '2014-11-29 06:34:31'),
(955, 131, '2b1b2967f9a997c5bc62baebbe7b0278.jpg', 64, '2014-11-29 06:34:32'),
(956, 131, '112c1ab7537f27a2d9dd02727fea4326.jpg', 65, '2014-11-29 06:34:33'),
(957, 131, '167f6ff12553d3535234d2faf69d57ad.jpg', 66, '2014-11-29 06:34:34'),
(958, 131, '3f0b59b232185b22fb3f73edf587d435.jpg', 67, '2014-11-29 06:34:35'),
(959, 131, 'f4893eef4865a79310e652e8cbbd6753.jpg', 68, '2014-11-29 06:34:36'),
(960, 131, 'fa3be369b6d415cb35a392dbc3498a81.jpg', 69, '2014-11-29 06:34:36'),
(961, 131, 'ab2ac5e8d285389ddd9bd0011544b358.jpg', 70, '2014-11-29 06:34:37'),
(962, 131, '37c6dd6b1aa90a911db981576871a7ca.jpg', 71, '2014-11-29 06:34:38'),
(963, 131, '99a5948749f255e1d00285564804d975.jpg', 72, '2014-11-29 06:34:39'),
(964, 131, '4ff19b72d6b708d809439b1208325617.jpg', 73, '2014-11-29 06:34:40'),
(965, 131, '709e54eb24be76cbb5b8f8062fcba950.jpg', 74, '2014-11-29 06:34:41'),
(966, 131, '2adf69b84487a5fc8390a97d9bac8b8b.jpg', 75, '2014-11-29 06:34:42'),
(967, 131, '9e1c15a83343269c2dafe7337af55abe.jpg', 76, '2014-11-29 06:34:43'),
(968, 131, '0dd7d18a20a87e24b89f70ebce7eef34.jpg', 77, '2014-11-29 06:34:43'),
(969, 131, '2bf539c2b0d50289540a929bb5ca5130.jpg', 78, '2014-11-29 06:34:44'),
(970, 131, '91ca52b64cf0f15d9ad16261a432dc14.jpg', 79, '2014-11-29 06:34:45'),
(974, 1, 'a', 3, '2014-12-04 17:45:04'),
(981, 134, 'a333a6bf281ed9045c3e97446ecd5131.jpg', 1, '2014-12-10 21:19:10'),
(982, 134, 'c4f59461f2edfb475cd35f3f8a3e1e0f.jpg', 2, '2014-12-10 21:19:10'),
(983, 134, 'b71ed0c07c12a865363dac92c3e9da50.jpg', 3, '2014-12-10 21:19:10'),
(984, 135, 'da78a214d2b2b98c213565539f1ec591.jpg', 1, '2014-12-10 21:22:11'),
(985, 134, '4b883095e08b1ca499906af10f0eea3e.jpg', 0, '2014-12-10 21:19:10'),
(986, 135, '9365ae980268ef00988a8048fa732226.jpg', 0, '2014-12-10 21:22:11');

-- --------------------------------------------------------

--
-- Table structure for table `province`
--

CREATE TABLE IF NOT EXISTS `province` (
`id` int(11) NOT NULL COMMENT '省份ID',
  `name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '省份名称'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `province`
--

INSERT INTO `province` (`id`, `name`) VALUES
(1, '直辖市');

-- --------------------------------------------------------

--
-- Table structure for table `publisher`
--

CREATE TABLE IF NOT EXISTS `publisher` (
`id` int(11) NOT NULL COMMENT '出版社ID',
  `name` text COLLATE utf8_unicode_ci NOT NULL COMMENT ' 出版社名称',
  `email` text COLLATE utf8_unicode_ci,
  `password` text COLLATE utf8_unicode_ci NOT NULL,
  `school` mediumint(9) NOT NULL COMMENT '从属学校ID'
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `publisher`
--

INSERT INTO `publisher` (`id`, `name`, `email`, `password`, `school`) VALUES
(1, 'Jinfinity', 'pagey_lee@sina.com', '', 1),
(2, '心境杂志社', '', '', 1),
(3, 'FGS创意出版中心', '', '', 1),
(4, '少年科学院', '', '', 1),
(5, '来真的杂志社', '', '', 1),
(6, 'Insider', '', '', 2),
(7, '首师附中学生会', '', '', 4),
(8, '瞰十一编辑部', '', '', 1),
(9, '交大附学生会', '', '', 5),
(10, '人文实验班', '', '', 3),
(11, '附中人杂志社', '', '', 4),
(12, '焰火杂志社', '', '', 4),
(13, '八一学生会', '', '', 6),
(14, '潞河中学学生会', '', '', 7),
(15, '钱学森理科实验班', '', '', 3),
(17, '我，我们杂志社', '', '', 1),
(18, '云栈编辑部', '', '', 8),
(19, '十一模拟联合国', '', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `publisherAdmin`
--

CREATE TABLE IF NOT EXISTS `publisherAdmin` (
`id` bigint(20) NOT NULL,
  `uid` bigint(20) NOT NULL,
  `publisher` bigint(20) NOT NULL,
  `timer` tinyint(1) NOT NULL,
  `isSuperAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE IF NOT EXISTS `school` (
`id` int(11) NOT NULL COMMENT '学校ID',
  `school` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '学校名称',
  `district` mediumint(9) NOT NULL COMMENT '所属区县ID'
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school`
--

INSERT INTO `school` (`id`, `school`, `district`) VALUES
(1, '北京十一学校', 8),
(2, '中国人民大学附属中学', 8),
(3, '北京一零一中学', 8),
(4, '首都师范大学附属中学', 8),
(5, '北方交通大学附属中学', 8),
(6, '北京市八一中学', 8),
(7, '潞河中学', 14),
(8, '清华大学附属中学', 8);

-- --------------------------------------------------------

--
-- Table structure for table `series`
--

CREATE TABLE IF NOT EXISTS `series` (
`id` bigint(20) NOT NULL COMMENT '系列ID',
  `name` text COLLATE utf8_unicode_ci NOT NULL COMMENT '系列名称',
  `publisher` bigint(20) NOT NULL COMMENT '出版社ID',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `series`
--

INSERT INTO `series` (`id`, `name`, `publisher`, `time`) VALUES
(52, '来真的', 1, '2014-11-29 05:56:02'),
(53, '真的', 2, '2014-12-07 01:57:06'),
(54, '新系列', 1, '2014-12-13 23:58:13');

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE IF NOT EXISTS `subscription` (
`id` bigint(20) NOT NULL,
  `user` bigint(20) NOT NULL,
  `series` bigint(20) NOT NULL,
  `subscriptTime` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`id`, `user`, `series`, `subscriptTime`) VALUES
(3, 1, 52, '2014-10-19 06:51:25'),
(4, 3, 52, '2014-12-07 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`id` bigint(20) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `email` text COLLATE utf8_unicode_ci NOT NULL,
  `password` text COLLATE utf8_unicode_ci NOT NULL,
  `profile` text COLLATE utf8_unicode_ci NOT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `everLoggedIn` tinyint(1) NOT NULL DEFAULT '0',
  `LastLogin` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `profile`, `CreatedTime`, `everLoggedIn`, `LastLogin`) VALUES
(1, '梦幻男孩', 'byliuyang11@gmail.com', '0e3eb08db8a8cb94570aaa18f8392e99', '', '2014-12-08 02:21:13', 0, '2014-12-07 00:00:00'),
(3, '欢子', 'pagey_lee@sina.com', '92769f731886de90247455e4fae04ed1', '', '2014-12-10 00:37:24', 0, '2014-12-09 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `visitor`
--

CREATE TABLE IF NOT EXISTS `visitor` (
`ID` bigint(20) NOT NULL,
  `magazine` bigint(20) NOT NULL,
  `IP` text COLLATE utf8_unicode_ci NOT NULL,
  `client` text COLLATE utf8_unicode_ci NOT NULL,
  `count` tinyint(4) NOT NULL DEFAULT '1',
  `time` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `visitor`
--

INSERT INTO `visitor` (`ID`, `magazine`, `IP`, `client`, `count`, `time`) VALUES
(38, 2, '130.215.121.109', 'd41d8cd98f00b204e9800998ecf8427e', 1, '2014-11-21 20:20:45'),
(39, 4, '130.215.121.109', 'b326b5062b2f0e69046810717534cb09', 1, '2014-11-21 20:21:17'),
(40, 8, '130.215.121.109', 'b326b5062b2f0e69046810717534cb09', 1, '2014-11-21 23:57:23'),
(41, 10, '130.215.121.109', 'b326b5062b2f0e69046810717534cb09', 1, '2014-11-22 15:16:33'),
(42, 3, '130.215.121.109', 'd41d8cd98f00b204e9800998ecf8427e', 1, '2014-11-22 16:43:54'),
(43, 6, '130.215.121.109', 'b326b5062b2f0e69046810717534cb09', 1, '2014-11-22 16:44:59'),
(44, 4, '130.215.121.109', 'b326b5062b2f0e69046810717534cb09', 1, '2014-11-22 21:41:19'),
(45, 1, '130.215.121.109', 'd41d8cd98f00b204e9800998ecf8427e', 1, '2014-11-23 17:54:52'),
(46, 3, '130.215.121.109', 'd41d8cd98f00b204e9800998ecf8427e', 1, '2014-11-23 17:55:27'),
(47, 2, '130.215.121.109', 'd41d8cd98f00b204e9800998ecf8427e', 1, '2014-11-23 17:55:51'),
(48, 43, '130.215.9.96', 'd41d8cd98f00b204e9800998ecf8427e', 1, '2014-11-24 11:09:35'),
(49, 4, '130.215.216.196', 'b326b5062b2f0e69046810717534cb09', 1, '2014-11-24 13:20:40'),
(50, 21, '130.215.216.196', 'd41d8cd98f00b204e9800998ecf8427e', 1, '2014-11-25 11:24:36'),
(51, 4, '130.215.216.196', 'd41d8cd98f00b204e9800998ecf8427e', 1, '2014-11-25 11:26:19'),
(52, 22, '130.215.216.196', 'd41d8cd98f00b204e9800998ecf8427e', 1, '2014-11-25 11:31:28'),
(53, 4, '130.215.216.196', 'b326b5062b2f0e69046810717534cb09', 1, '2014-11-25 14:24:48'),
(54, 16, '130.215.216.196', 'b326b5062b2f0e69046810717534cb09', 1, '2014-11-25 21:27:51'),
(55, 4, '130.215.216.196', 'b326b5062b2f0e69046810717534cb09', 1, '2014-11-26 19:24:00'),
(56, 32, '130.215.216.196', 'd41d8cd98f00b204e9800998ecf8427e', 1, '2014-11-26 19:24:06'),
(57, 3, '130.215.216.196', 'd41d8cd98f00b204e9800998ecf8427e', 1, '2014-11-28 19:05:46'),
(58, 131, '130.215.216.196', 'd41d8cd98f00b204e9800998ecf8427e', 1, '2014-11-29 01:58:56'),
(59, 131, '130.215.174.209', 'd41d8cd98f00b204e9800998ecf8427e', 1, '2014-11-29 20:51:32');

-- --------------------------------------------------------

--
-- Table structure for table `wallpaper`
--

CREATE TABLE IF NOT EXISTS `wallpaper` (
`id` bigint(20) NOT NULL,
  `user` bigint(20) DEFAULT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isOfficial` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `appkey`
--
ALTER TABLE `appkey`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `district`
--
ALTER TABLE `district`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `keyWord`
--
ALTER TABLE `keyWord`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `magazine`
--
ALTER TABLE `magazine`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `province`
--
ALTER TABLE `province`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `publisher`
--
ALTER TABLE `publisher`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `publisherAdmin`
--
ALTER TABLE `publisherAdmin`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school`
--
ALTER TABLE `school`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `series`
--
ALTER TABLE `series`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visitor`
--
ALTER TABLE `visitor`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `wallpaper`
--
ALTER TABLE `wallpaper`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `appkey`
--
ALTER TABLE `appkey`
MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '城市ID',AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `district`
--
ALTER TABLE `district`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '区县ID',AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '反馈ID',AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `keyWord`
--
ALTER TABLE `keyWord`
MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=60;
--
-- AUTO_INCREMENT for table `magazine`
--
ALTER TABLE `magazine`
MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '刊物ID',AUTO_INCREMENT=136;
--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=987;
--
-- AUTO_INCREMENT for table `province`
--
ALTER TABLE `province`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '省份ID',AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `publisher`
--
ALTER TABLE `publisher`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '出版社ID',AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `publisherAdmin`
--
ALTER TABLE `publisherAdmin`
MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `school`
--
ALTER TABLE `school`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '学校ID',AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `series`
--
ALTER TABLE `series`
MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '系列ID',AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT for table `subscription`
--
ALTER TABLE `subscription`
MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `visitor`
--
ALTER TABLE `visitor`
MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=60;
--
-- AUTO_INCREMENT for table `wallpaper`
--
ALTER TABLE `wallpaper`
MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
