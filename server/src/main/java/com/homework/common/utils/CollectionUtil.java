package com.homework.common.utils;

import com.google.common.base.Objects;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by pengfei.zhao;
 * Date 2015/3/13
 * Time 9:41
 */
public class CollectionUtil {
    /**
     * 生成树形的通用方法
     * @param origins 原始列表
     * @param treeHelper   树形接口
     * @param <IdClass> ID类型
     * @return 产生的树
     */
    public static <T, IdClass> List<T> generateTree(List<T> origins, TreeHelper<T, IdClass> treeHelper) {
        Map<IdClass, T> map = new HashMap<IdClass, T>();
        for (T origin : origins) {
            map.put(treeHelper.getId(origin), origin);
        }

        List<T> result = new ArrayList<T>();

        for (T value : origins) {
            if (Objects.equal(treeHelper.getPid(value), treeHelper.getRootId())) {
                result.add(value);
                continue;
            }
            T parent = map.get(treeHelper.getPid(value));
            if (parent == null) {
                result.add(value);
                continue;
            }
            treeHelper.getChildren(parent).add(value);
        }
        return result;
    }


    public interface TreeHelper<T, IdClass> {
        public IdClass getId(T value);

        public IdClass getPid(T value);

        public IdClass getRootId();

        public List<T> getChildren(T value);
    }
}
