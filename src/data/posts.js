export const posts = [
    {
      id: 1,
      userId: 101,
      user: "Quốc Đạt",
      avatar: "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-1/480308827_1945782512614785_6981558240544041603_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=106&ccb=1-7&_nc_sid=e99d92&_nc_ohc=ggLrrSbkJAMQ7kNvgGOSeU4&_nc_oc=Adkgux5usLcYKi7Z2c4FnLshXz9R0GxxVdJpsMdg9C10we_fgSM-PmBABwx4vnvqGHvFRvgh4-7ypRxpBYJ4sLOD&_nc_zt=24&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=vRPYt9YB55nAdi9AEKEwbg&oh=00_AYHlg_ENxi3PXhHtjRt7qahSxNMWcvwFoZdx5g8XwJSxuQ&oe=67EB4071",
      content: "Đá cho vui mà lỡ vô địch rồi anh em ☀️",
      image: "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/486112111_974577478162743_6178095938562893404_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ZnxDr5DaSQsQ7kNvgGNlB5E&_nc_oc=Adk4Iau2LbHDsK7R1RFxErz4pJQmSoTBJLmKryMQBSzndoXPZFYqf_NsQ8gB_7mrGBKDDhPPtV41mdKpRi31vuHZ&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=Uv4rwgO968S1GUDMVOJFrg&oh=00_AYGAIcOHmXd_iJL60gEjO50vfc9XUWrgV_UTe276CKw1Tg&oe=67EB3394",
      likes: 10,
      comments: 3,
      createdAt: new Date("2024-03-20T10:30:00").getTime(),
      likedBy: [],
      commentList: [
        {
          userId: 102,
          content: "Đúng rồi!",
        },
      ],
    },
    {
      id: 2,
      userId: 102,
      user: "Nguyen Thi Thanh Phuong",
      avatar: "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/481708802_1178620543870628_8200141194413590788_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=1d2534&_nc_ohc=kyDuqEjMuDIQ7kNvgHeig-v&_nc_oc=AdlPdr0W4t87lqWWKNDfbEFIza7AUyCe7rHKjdawp4n7WZneyleT2JmwYqtXdDpdVNZWKEZtLOSDi0XeaEoCMpJh&_nc_zt=24&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=1ktr_KOi823A7r2f00gRYA&oh=00_AYE5sOxUnsGGS5kS5WXXMyX_11mq75WUAO9GsljMaxfzbQ&oe=67EB40B1",
      content: "đã đến lúc mùa hè nhường cho mùa xuân 🌼🧏🏻‍♀️",
      image: "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/480747204_1171033827962633_4121451276070601709_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=ENJTb1222TgQ7kNvgEl3oz2&_nc_oc=Adn9l-DKOM_919hw_Jq1hhOSpD1YZ3FXZ1SgrUeSzxaDxcTiMU4bgUu-UuXeLhLRWEbmgdD75t74Ftvo_ZsCRwFM&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=5mBqZ9zRa7HPF72Vd3okdg&oh=00_AYF84vrk37yhXPUFON7havyVPw380XrVDcQ-pdkdezwr6Q&oe=67EB42DF",
      likes: 5,
      comments: 1,
      createdAt: new Date("2024-03-20T09:15:00").getTime(),
      likedBy: [],
      commentList: [
        {
          userId: 101,
          content: "Cảm ơn bạn!",
        },
      ],
    },
    {
      id: 3,
      userId: 103,
      user: "Minh Đức",
      avatar: "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/475771144_1387221275598595_4555221697990940069_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_ohc=Kxy-JFjMRUgQ7kNvgE-0y5f&_nc_oc=AdnfEV752eEFaMaKJqxUdvbXmJBbFqajmYAtV4UC0vBuI1U9AbQ_HNLNoNcceHU6sFn8UDKQ9DLFRvwT9pH4MmYv&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=q-xn8VVAB7jZGkKJnyW-cA&oh=00_AYE7NFwKlEiGX3Jr1_DYdKOl0PTHSSnXCnBWz5E2P2282g&oe=67EB25E2",
      content: "Đêm noel con ước là..",
      image: "https://external.fsgn2-10.fna.fbcdn.net/emg1/v/t13/13967256795059096117?url=https%3A%2F%2Fi.ytimg.com%2Fvi%2Fc35gZZi-Lhw%2Fmaxresdefault.jpg&fb_obo=1&utld=ytimg.com&stp=c0.5000x0.5000f_dst-jpg_flffffff_p500x261_q75_tt6&_nc_oc=AdlqAlmVGNc1WRytlXyc4VnQNTtFG7jZsVDRKKFtyfWIyJ2Y-VHktGk6giW8tJjK-hzA8bI2p4XcLdV01QW3ef-P&ccb=13-1&oh=06_Q39-CBde3EVQw_977O3Sv8AfinJM5BOaCS7m5_nNuedGtGI&oe=67E75B5C&_nc_sid=c97757",
      likes: 8,
      comments: 2,
      createdAt: new Date("2024-03-19T15:45:00").getTime(),
      likedBy: [],
      commentList: [],
    },
    {
        id: 4,
        user: "Minh An",
        userId: 104,
        avatar: "https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/444468867_489747743612462_581458884010500501_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=9rt1NiVjPzMQ7kNvgHpQir-&_nc_oc=Adkgb94wGRoCc46vTDNcdJRNTqOUf8pQbGKecaum41OEspo_SFhiJN_Q9x2mvj4A1rVmHa-O5gsVsyaDwN_srltl&_nc_zt=23&_nc_ht=scontent.fsgn2-3.fna&_nc_gid=DUsZbc3XmCdUkQhdmRJEKA&oh=00_AYFgR77NXf4Wyz_pJOOfLfFQZ_FqszdZo5rnfNMY7M9T8g&oe=67EB3B21",
        content: "cảm ơn Đình Khang đã quá trời hỗ trợ t nộp bài 🫶",
        image: "https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-6/487139224_1067713545390777_1277968611672323465_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Y_Y9HqHgMn0Q7kNvgHyjbmr&_nc_oc=Adk58XcSixop0JfoirfI33N1ZZwav-Epz3l5zA9wUlSlKEg9Ufj6uklhWgOy09k9Er4gxgtt82mRvSjMZPSp5oho&_nc_zt=23&_nc_ht=scontent.fsgn2-10.fna&_nc_gid=3ZCFi4E0LjaLP366fW-btw&oh=00_AYGBZ5QIlV3yzS8RR5UR2IHFuZ7HQtKDJ4GrRyL_bg_HIQ&oe=67EB515A",
        likes: 13,
        comments: 4,
        createdAt: new Date("2025-03-28T15:10:00").getTime(),
        likedBy: [],
        commentList: [],
      },
  ];
  