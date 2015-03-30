package com.homework.common.utils.encrypt;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.codec.digest.DigestUtils;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;

/**
 * AES 对称加密算法.
 * @author anfu.yang
 * @date 2015年3月12日 上午11:04:22
 */
public class AES {
	// 密钥算法
	public static final String ALGORITHM = "AES";
	// 密钥长度(java默认只能处理128位以内的长度,如果需要处理大于128位可以使用JCE解除密钥长度限制)
	public static final int KEY_SIZE = 128;

	/**
	 * 转换密钥
	 * 
	 * @param key
	 *            二进制密钥
	 * @return Key 密钥
	 * @throws Exception
	 */
	public static Key toKey(byte[] key) throws Exception {
		// 实例化AES密钥材料
		SecretKey secretKey = new SecretKeySpec(key, ALGORITHM);
		return secretKey;
	}

	/**
	 * 解密
	 * 
	 * @param data
	 *            待解密数据
	 * @param key
	 *            密钥
	 * @return byte[] 解密数据
	 * @throws Exception
	 */
	public static byte[] decrypt(byte[] data, byte[] key) throws Exception {
		// 还原密钥
		Key k = toKey(key);
		// 实例化
		Cipher cipher = Cipher.getInstance(ALGORITHM);
		// 初始化,设置为解密模式
		cipher.init(Cipher.DECRYPT_MODE, k);
		// 执行操作
		return cipher.doFinal(data);
	}

	/**
	 * 解密
	 * 
	 * @param data
	 *            待解密数据
	 * @param key
	 *            密钥
	 * @return byte[] 解密数据
	 * @throws Exception
	 */
	public static byte[] decrypt(byte[] data, String key) throws Exception {
		return decrypt(data, getKey(key));
	}
	
	/**
	 * 解密
	 * 
	 * @param base64data
	 *            待解密BASE64编码数据
	 * @param key
	 *            密钥
	 * @return byte[] 解密数据
	 * @throws Exception
	 */
	public static byte[] decrypt(String base64data, String key) throws Exception {
		return decrypt(Base64.decodeBase64(base64data), getKey(key));
	}

	/**
	 * 加密
	 * 
	 * @param data
	 *            待加密数据
	 * @param key
	 *            密钥
	 * @return byte[] 加密数据
	 * @throws Exception
	 */
	public static byte[] encrypt(byte[] data, byte[] key) throws Exception {
		// 还原密钥
		Key k = toKey(key);
		// 实例化
		Cipher cipher = Cipher.getInstance(ALGORITHM);
		// 初始化,设置为加密模式
		cipher.init(Cipher.ENCRYPT_MODE, k);
		// 执行操作
		return cipher.doFinal(data);
	}

	/**
	 * 加密
	 * 
	 * @param data
	 *            待加密数据
	 * @param key
	 *            密钥
	 * @return byte[] 加密数据
	 * @throws Exception
	 */
	public static byte[] encrypt(byte[] data, String key) throws Exception {
		return encrypt(data, getKey(key));
	}
	
	/**
	 * 加密
	 * 
	 * @param data
	 *            待加密数据
	 * @param key
	 *            密钥
	 * @return string 加密数据
	 * @throws Exception
	 */
	public static String encrypt(String data, String key) throws Exception {
		return Base64.encodeBase64String(encrypt(data.getBytes("UTF-8"), getKey(key)));
	}
	

	/**
	 * 生成密钥
	 * 
	 * @return byte[] 二进制密钥
	 * @throws Exception
	 */
	public static byte[] initKey() throws Exception {
		// 实例化
		KeyGenerator kg = KeyGenerator.getInstance(ALGORITHM);
		// 初始化密钥长度
		kg.init(KEY_SIZE);
		// 生成秘密密钥
		SecretKey secretKey = kg.generateKey();
		// 获得密钥的二进制编码形式
		return secretKey.getEncoded();
	}

	/**
	 * 初始化密钥
	 * 
	 * @return String Base64编码密钥
	 * @throws Exception
	 */
	public static String initKeyString() throws Exception {
		return Base64.encodeBase64String(initKey());
	}
	
	public static String initKeyString16() throws Exception {
		return new String(Hex.encodeHex(initKey()));
	}

	/**
	 * 获取密钥
	 * 
	 * @param key
	 * @return byte[] 密钥
	 * @throws Exception
	 */
	public static byte[] getKey(String key) throws Exception {
		return Base64.decodeBase64(key);
	}

	/**
	 * 摘要处理
	 * 
	 * @param data
	 *            待摘要数据
	 * @return String 摘要字符串
	 */
	public static String shaHex(byte[] data) {
		return DigestUtils.md5Hex(data);
	}


}