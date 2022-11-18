import { Input, Slider } from '@fluentui/react-components';
import { Dropdown, Option } from '@fluentui/react-components/unstable';
import clsx from 'clsx';
import { SELECT_DISKS, SELECT_NODES } from './infra_share';
import styles from './select_node.module.scss';

type SelectNodeComponent = {
  type: string;
  nodeType: string;
  nodeCount: string;
  nodeDisk: number;
  diskType: string;
  dispatchInfraForm: (action: any) => void;
};

const SelectNodeComponent = ({
  type,
  nodeType,
  nodeCount,
  nodeDisk,
  diskType,
  dispatchInfraForm
}: SelectNodeComponent) => {
  const onSelectNodeType = (label: string | undefined) => {
    let item = SELECT_NODES.find((item) => item.label === label);
    if (type === 'Master') {
      dispatchInfraForm({ payload: { masterType: item?.key } });
    }
    if (type === 'Node') {
      dispatchInfraForm({ payload: { nodeType: item?.key } });
    }
  };

  const onSelectDiskType = (label: string | undefined) => {
    let item = SELECT_DISKS.find((item) => item.label === label);
    if (type === 'Master') {
      dispatchInfraForm({ payload: { masterDiskType: item?.key } });
    }
    if (type === 'Node') {
      dispatchInfraForm({ payload: { nodeDiskType: item?.key } });
    }
  };

  const onDefaultNodeType = (key: string): string[] => {
    let item = SELECT_NODES.find((item) => item.key === key);
    return [item?.label as string];
  };

  const onDefaultDiskType = (key: string): string[] => {
    let item = SELECT_DISKS.find((item) => item.key === key);
    return [item?.label as string];
  };

  const setNodeCountValue = (value: string) => {
    if (type === 'Master') {
      dispatchInfraForm({ payload: { masterCount: value } });
    }
    if (type === 'Node') {
      dispatchInfraForm({ payload: { nodeCount: value } });
    }
  };

  const setNodeDiskValue = (value: number) => {
    if (type === 'Master') {
      dispatchInfraForm({ payload: { masterDisk: value } });
    }
    if (type === 'Node') {
      dispatchInfraForm({ payload: { nodeDisk: value } });
    }
  };

  return (
    <div>
      <div className={styles.head}>
        <div className={styles.dot}></div>
        <span className={styles.info}>{type} 节点</span>
      </div>
      <div className="pl-8 mt-6">
        <span className={styles.cloudLabel}>机器</span>
        <Dropdown
          className={styles.selectType}
          placeholder="请选择类型"
          selectedOptions={onDefaultNodeType(nodeType)}
          onOptionSelect={(e, data) => onSelectNodeType(data.optionValue)}
        >
          {SELECT_NODES.map((item) => (
            <Option key={item.key}>{item.label}</Option>
          ))}
        </Dropdown>
        <Input
          className={styles.selectTypeCount}
          value={nodeCount}
          contentAfter={'台'}
          onChange={(e, data) => setNodeCountValue(data.value)}
        ></Input>
      </div>
      <div className="pl-8 mt-6 flex items-center">
        <span className={styles.cloudLabel}>硬盘</span>
        <Dropdown
          className={styles.selectType}
          placeholder="请选择类型"
          selectedOptions={onDefaultDiskType(diskType)}
          onOptionSelect={(e, data) => onSelectDiskType(data.optionValue)}
        >
          {SELECT_DISKS.map((item) => (
            <Option key={item.key}>{item.label}</Option>
          ))}
        </Dropdown>
        <Slider
          className={clsx(styles.selectTypeCount)}
          min={0}
          max={128}
          // className="w-72 mr-4"
          value={nodeDisk}
          onChange={(e, data) => setNodeDiskValue(data.value)}
        />
        <span> {nodeDisk}G </span>
      </div>
    </div>
  );
};

export default SelectNodeComponent;