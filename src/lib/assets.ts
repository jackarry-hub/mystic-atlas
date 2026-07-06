const publicBase = import.meta.env.BASE_URL.replace(/\/$/, "");
const base = `${publicBase}/assets/mystic-atlas`;

export const assets = {
  backgrounds: {
    home: `${base}/backgrounds/bg_home.png`,
    services: `${base}/backgrounds/bg_services.png`,
    knowledge: `${base}/backgrounds/bg_knowledge.png`,
    religions: `${base}/backgrounds/bg_religions.png`,
    eastern: `${base}/backgrounds/bg_eastern.png`,
    western: `${base}/backgrounds/bg_western_mysticism.png`,
    hongKongFolk: `${base}/backgrounds/bg_hongkong_folk.png`,
    geoMap: `${base}/backgrounds/bg_geo_map.png`,
    shop: `${base}/backgrounds/bg_shop.png`,
    virtualShop: `${base}/backgrounds/bg_virtual_shop.png`,
    productDetail: `${base}/backgrounds/bg_product_detail.png`,
    reports: `${base}/backgrounds/bg_report_center.png`,
    reportDetail: `${base}/backgrounds/bg_report_detail.png`,
    reportArchive: `${base}/backgrounds/bg_report_archive.png`,
    login: `${base}/backgrounds/bg_login.png`,
    account: `${base}/backgrounds/bg_account.png`,
    profileDashboard: `${base}/backgrounds/bg_profile_dashboard.png`,
    orders: `${base}/backgrounds/bg_orders.png`,
    membership: `${base}/backgrounds/bg_membership.png`
  },
  heroes: {
    homeAstrolabe: `${base}/heroes/hero_home_astrolabe.png`,
    serviceCrystal: `${base}/heroes/hero_service_crystal.png`,
    knowledgeBookCrystal: `${base}/heroes/hero_knowledge_book_crystal.png`,
    easternYinyang: `${base}/heroes/hero_eastern_yinyang.png`,
    westernCompass: `${base}/heroes/hero_western_compass.png`,
    hongKongIncense: `${base}/heroes/hero_hongkong_incense.png`,
    geoWorldMap: `${base}/heroes/hero_geo_world_map.png`,
    shopCrystalPlatform: `${base}/heroes/hero_shop_crystal_platform.png`,
    reportBook: `${base}/heroes/hero_report_book.png`,
    reportZodiacAstrolabe: `${base}/heroes/hero_report_zodiac_astrolabe.png`,
    archiveCrystal: `${base}/heroes/hero_archive_crystal.png`,
    loginOrbitPlatform: `${base}/heroes/hero_login_orbit_platform.png`,
    accountAvatarCrystal: `${base}/heroes/hero_account_avatar_crystal.png`,
    profileAvatar: `${base}/heroes/hero_profile_avatar.png`,
    profileCrystalCluster: `${base}/heroes/hero_profile_crystal_cluster.png`,
    membershipBadge: `${base}/heroes/hero_membership_badge.png`,
    moonPhaseHero: `${base}/heroes/moon-phase-hero.png`
  },
  products: {
    lots: `${base}/products/product_lots.png`,
    folkStatue: `${base}/products/product_folk_statue.png`,
    paperDoll: `${base}/products/product_paper_doll.png`,
    guardCoin: `${base}/products/product_guard_coin.png`,
    incense: `${base}/products/product_incense.png`,
    lantern: `${base}/products/product_lantern.png`,
    crystalPendant: `${base}/products/product_crystal_pendant.png`,
    blueGemPendant: `${base}/products/blue-gem-pendant.png`,
    crystalDisk: `${base}/products/crystal-oracle-disk-wide.png`,
    deityStatue: `${base}/products/black-deity-statue.png`,
    medallion: `${base}/products/crystal-medallion-gold.png`,
    talisman: `${base}/products/round-crystal-sigil.png`,
    burner: `${base}/products/bronze-incense-burner-tall.png`,
    oracleWheel: `${base}/products/zodiac-oracle-wheel.png`
  }
};
