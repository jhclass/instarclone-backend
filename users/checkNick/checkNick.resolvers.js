import client from "../../client";
export default {
  Mutation: {
    checkNick: async (_, { nick }) => {
      const regex = /^[a-zA-Zㄱ-ㅎ가-힣0-9]+$/;
      const isEnglish = regex.test(nick);
      if (isEnglish) {
        const checkNick = await client.user.count({
          where: {
            firstName: nick,
          },
        });
        if (checkNick > 0) {
          return {
            ok: false,
            message: " 이미 존재하는 이름 또는 닉네임 입니다.",
          };
        } else {
          return {
            ok: true,
            message: " 사용가능한 이름 또는 닉네임 입니다.",
          };
        }
      } else {
        return {
          ok: false,
          message: "영어(대,소문자),한글,숫자만 사용가능합니다.",
        };
      }
    },
  },
};
