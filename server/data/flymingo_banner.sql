-- Flymingo Logistics MySQL Database Dump for Banner Module
-- Database: `flymingo`

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Table structure for table `banner_settings`
--

CREATE TABLE IF NOT EXISTS `banner_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banner_settings`
--

INSERT INTO `banner_settings` (`setting_key`, `setting_value`) VALUES
('banner_video', '/assets/fliqmarine-hero.mov')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);

-- --------------------------------------------------------

--
-- Table structure for table `hero_slides`
--

CREATE TABLE IF NOT EXISTS `hero_slides` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slide_id` varchar(100) NOT NULL,
  `title_prefix` varchar(255) NOT NULL,
  `highlight` varchar(255) NOT NULL,
  `title_suffix` varchar(255) DEFAULT '',
  `description` text NOT NULL,
  `primary_cta` varchar(100) NOT NULL,
  `primary_slug` varchar(255) NOT NULL,
  `secondary_cta` varchar(100) NOT NULL,
  `secondary_slug` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slide_id` (`slide_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hero_slides`
--

INSERT INTO `hero_slides` (`slide_id`, `title_prefix`, `highlight`, `title_suffix`, `description`, `primary_cta`, `primary_slug`, `secondary_cta`, `secondary_slug`, `is_active`, `sort_order`) VALUES
('marine-logistics', 'Your Global ', 'Logistics Partner', '', 'End-to-end logistics and courier solutions with operational excellence, global reach and a commitment to trust, safety and timely delivery across 190+ countries.', 'Explore Our Services', '/services', 'Get Fare Rate', '/contact', 1, 1),
('worldwide-courier', 'Rapid Door-to-Door ', 'Worldwide Delivery', '', 'Connecting 190+ countries with priority doorstep pickup across South India for commercial samples, urgent documents, and specialized NRI parcels.', 'Explore Courier Rates', '/services/international-courier', 'Get Instant Quote', '/quote', 1, 2),
('customs-brokerage', 'Seamless Ocean & Air ', 'Freight Clearance', '', 'Dedicated seaport and airport customs house brokerage with direct ICEGATE EDI filing, bonded warehousing, and multi-modal freight transport.', 'Consult Customs Broker', '/services/customs-clearance', 'Contact Team', '/contact', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `page_banners`
--

CREATE TABLE IF NOT EXISTS `page_banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page_key` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `highlight` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `page_key` (`page_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `page_banners`
--

INSERT INTO `page_banners` (`page_key`, `title`, `highlight`, `image`) VALUES
('about', 'We Are The Bridge Between You And Your Relations.', 'Across Oceans & Continents.', '/assets/banner-marine-hd.jpg'),
('services', 'Six Proven Channels.', 'Zero Cargo Gaps.', '/assets/banner-courier-hd.jpg'),
('contact', 'Direct Lines.', 'Immediate Logistics Response.', '/assets/banner-contact-hd.jpg');

COMMIT;
