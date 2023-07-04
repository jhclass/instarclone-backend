export default {
  Query: {
    checkNick: async (_, { nick }) => {
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
    },
  },
};
