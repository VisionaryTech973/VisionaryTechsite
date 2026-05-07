import re

file_path = '/Users/noah/.gemini/antigravity/scratch/visionary-tech/translations.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

keys_to_remove = [
    'nav_sectors', 'hero_btn_dl',
    'what_title', 'what_title_hl', 'what_desc', 'what_li1', 'what_li2', 'what_li3', 'what_li4',
    'sec_title', 'sec_title_hl', 'sec_s1_title', 'sec_s1_desc', 'sec_s2_title', 'sec_s2_desc', 'sec_s3_title', 'sec_s3_desc', 'sec_s4_title', 'sec_s4_desc',
    'pr_s1_target', 'pr_s2_target', 'pr_s2_l4', 'pr_s3_target', 'pr_s3_l1', 'pr_s3_l2', 'pr_s3_l3', 'pr_s4_target',
    'pr_feat_ai', 'pr_feat_export', 'pr_feat_email', 'pr_feat_priority', 'pr_feat_onsite', 'pr_feat_multi', 'pr_feat_manager',
    'ct_btn1', 'ct_btn2',
    'trial_title_prefix', 'trial_title_highlight', 'trial_desc',
    'trial_f_company_label', 'trial_f_company_placeholder',
    'trial_f_email_label', 'trial_f_email_placeholder',
    'trial_f_sector_label', 'trial_f_sector_opt_default', 'trial_f_sector_opt_funeral', 'trial_f_sector_opt_public', 'trial_f_sector_opt_legal', 'trial_f_sector_opt_admin', 'trial_f_sector_opt_other',
    'trial_f_volume_label', 'trial_f_volume_opt_default', 'trial_f_volume_opt_lt50', 'trial_f_volume_opt_50_200', 'trial_f_volume_opt_200_500', 'trial_f_volume_opt_gt500',
    'trial_f_submit', 'trial_success_title', 'trial_success_desc', 'trial_success_close',
    'ft_l2', 'ft_l4'
]

# We need to remove lines matching `\s*key:\s*".*",?`
for key in keys_to_remove:
    # Match the key, optional quotes around it, colon, string value, and optional comma
    pattern = r'^\s*(["\']?)' + key + r'\1\s*:\s*".*?",?\s*$\n?'
    content = re.sub(pattern, '', content, flags=re.MULTILINE)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

