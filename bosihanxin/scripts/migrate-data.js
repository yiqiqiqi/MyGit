/**
 * 数据迁移工具
 * 帮助用户从localStorage迁移用户数据到新的数据库系统
 * 
 * 使用方法：
 * 1. 打开浏览器开发者工具控制台
 * 2. 复制以下代码并运行
 * 3. 按照提示操作
 */

// 门派列表
const sects = [
  'tianyan', 'qianli', 'suantian', 'yuqi', 'juneng', 'ronghe',
  'tianji', 'huanxiang', 'yunxiao', 'jiagou', 'shuju', 'zhihui'
];

// 迁移工具
window.EenousDataMigration = {
  // 导出localStorage数据
  exportLocalStorageData() {
    const data = {
      globalUsers: {},
      sectUsers: {},
      exportTime: new Date().toISOString()
    };

    // 扫描localStorage中的用户数据
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (key.startsWith('global_user_')) {
        const qq = key.replace('global_user_', '');
        try {
          data.globalUsers[qq] = JSON.parse(localStorage.getItem(key));
        } catch (e) {
          console.warn('解析全局用户数据失败:', key);
        }
      }
      
      if (key.startsWith('sect_user_')) {
        try {
          const sectUserData = JSON.parse(localStorage.getItem(key));
          const sectId = sectUserData.sectId;
          const qq = sectUserData.qq;
          
          if (!data.sectUsers[qq]) {
            data.sectUsers[qq] = {};
          }
          data.sectUsers[qq][sectId] = sectUserData;
        } catch (e) {
          console.warn('解析门派用户数据失败:', key);
        }
      }
    }

    return data;
  },

  // 生成下载链接
  downloadData() {
    const data = this.exportLocalStorageData();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `eenous-user-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('数据已导出，请保存文件');
    return data;
  },

  // 显示迁移说明
  showMigrationInstructions() {
    console.log(`
=== EEnous 用户数据迁移指南 ===

由于系统升级，我们已经将用户认证系统从本地存储升级为服务器端数据库存储。
现在您可以在任何设备上登录您的账号了！

迁移步骤：

1. 导出当前数据：
   EenousDataMigration.downloadData();

2. 保存导出的JSON文件作为备份

3. 使用新的注册功能重新注册您的账号
   - 访问任意门派页面
   - 使用相同的QQ号和昵称重新注册
   - 设置新的密码（可以与原密码相同）

4. 现在您可以在任何设备上登录了！

注意：
- 原本的任务和建议数据仍然保存在localStorage中，不会丢失
- 新系统使用更安全的密码加密方式
- 会话管理支持自动登录和跨设备同步

开始迁移：
EenousDataMigration.downloadData();
    `);
  },

  // 显示当前用户数据统计
  showUserStats() {
    const data = this.exportLocalStorageData();
    
    console.log('=== 当前用户数据统计 ===');
    console.log(`全局用户数：${Object.keys(data.globalUsers).length}`);
    
    const sectStats = {};
    Object.values(data.sectUsers).forEach(userSects => {
      Object.keys(userSects).forEach(sectId => {
        sectStats[sectId] = (sectStats[sectId] || 0) + 1;
      });
    });
    
    console.log('各门派用户数：');
    Object.entries(sectStats).forEach(([sectId, count]) => {
      console.log(`  ${sectId}: ${count} 人`);
    });
    
    return data;
  },

  // 清理localStorage数据（谨慎使用）
  clearOldUserData() {
    if (!confirm('确定要清理旧的用户数据吗？请确保已经完成迁移！')) {
      return;
    }
    
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('global_user_') || 
          key.startsWith('sect_user_') || 
          key.startsWith('current_sect_user_')) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log(`已清理 ${keysToRemove.length} 个旧数据项`);
  }
};

// 自动显示迁移说明
if (typeof window !== 'undefined') {
  console.log('EEnous 数据迁移工具已加载');
  console.log('运行 EenousDataMigration.showMigrationInstructions() 查看完整迁移指南');
} 