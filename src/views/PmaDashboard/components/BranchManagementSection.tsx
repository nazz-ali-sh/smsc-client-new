'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Box, Card, Tab, Tabs, Typography } from '@mui/material'

import CommonTable from '@/common/CommonTable'
import CustomButton from '@/common/CustomButton'

interface TableData {
  id: number
  name: string
  status: string
  location: string
  assignedTo: string
}

const dummyTableData: TableData[] = [
  {
    id: 1,
    name: 'Amon Curtis',
    status: 'Active',
    location: 'SW, London',
    assignedTo: 'Ken'
  },
  {
    id: 2,
    name: 'Username 2',
    status: 'Active',
    location: 'SW, London',
    assignedTo: 'Task Holder'
  },
  {
    id: 3,
    name: 'Username 3',
    status: 'Active',
    location: 'SW, London',
    assignedTo: 'Task Holder'
  },
  {
    id: 4,
    name: 'Username 4',
    status: 'Inactive',
    location: 'SW, London',
    assignedTo: 'Task Holder'
  },
  {
    id: 5,
    name: 'Username 5',
    status: 'Inactive',
    location: 'SW, London',
    assignedTo: 'Task Holder'
  }
]

const BranchManagementSection = () => {
  const [activeTab, setActiveTab] = useState(0)

  const router = useRouter()

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleNavigate = () => {
    if (activeTab === 0) {
      router.push('/branch-management')
    } else {
      router.push('/user-management')
    }
  }

  const tableColumns = [
    {
      accessorKey: 'name',
      header: activeTab === 0 ? 'BRANCH NAME' : 'USER NAME',
      size: 200,
      cell: ({ row }: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: '24px',
              height: '24px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <i className={activeTab === 0 ? 'ri-folder-line text-[#F59E0B]' : 'ri-user-line text-[#3B82F6]'}></i>
          </Box>
          <Typography sx={{ fontSize: '14px', color: '#374151' }}>{row.original.name}</Typography>
        </Box>
      )
    },
    {
      accessorKey: 'status',
      header: 'STATUS',
      size: 150,
      cell: ({ row }: any) => (
        <Typography
          sx={{
            fontSize: '14px',
            color: row.original.status === 'Active' ? '#10B981' : '#6B7280'
          }}
        >
          {row.original.status}
        </Typography>
      )
    },
    {
      accessorKey: 'location',
      header: 'LOCATION',
      size: 150,
      cell: ({ row }: any) => (
        <Typography sx={{ fontSize: '14px', color: '#6B7280' }}>{row.original.location}</Typography>
      )
    },
    {
      accessorKey: 'assignedTo',
      header: 'ASSIGNED TO',
      size: 150,
      cell: ({ row }: any) => (
        <Typography sx={{ fontSize: '14px', color: '#6B7280' }}>{row.original.assignedTo}</Typography>
      )
    },
    {
      accessorKey: 'action',
      header: 'ACTION',
      size: 100,
      enableSorting: false,
      cell: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <i className='ri-more-2-fill text-[#6B7280] cursor-pointer text-[20px]'></i>
        </Box>
      )
    }
  ]

  return (
    <Box sx={{ marginTop: 12, marginBottom: 4 }}>
      <Card
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            padding: 3,
            paddingBottom: 0
          }}
        >
          <CustomButton onClick={handleNavigate}> {activeTab === 0 ? 'Add Branch' : 'Add User'} </CustomButton>
        </Box>
        <Box sx={{ paddingX: 3, paddingTop: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#35C0ED',
                height: '3px'
              },
              borderBottom: 'none'
            }}
          >
            <Tab
              icon={
                <Box
                  sx={{
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <i className='ri-thumb-up-line text-[20px]'></i>
                </Box>
              }
              iconPosition='start'
              label='Active Offices'
              sx={{
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 500,
                color: '#6B7280',
                minHeight: '48px',
                '&.Mui-selected': {
                  color: '#35C0ED',
                  fontWeight: 600
                },
                '& .MuiTab-iconWrapper': {
                  marginRight: '8px',
                  marginBottom: 0
                }
              }}
            />
            <Tab
              icon={
                <Box
                  sx={{
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <i className='ri-group-line text-[20px]'></i>
                </Box>
              }
              iconPosition='start'
              label='Active Users'
              sx={{
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 500,
                color: '#6B7280',
                minHeight: '48px',
                '&.Mui-selected': {
                  color: '#35C0ED',
                  fontWeight: 600
                },
                '& .MuiTab-iconWrapper': {
                  marginRight: '8px',
                  marginBottom: 0
                }
              }}
            />
          </Tabs>
        </Box>

        <CommonTable
          data={dummyTableData}
          columns={tableColumns}
          pagination={{ pageIndex: 0, pageSize: 5 }}
          onPaginationChange={() => {}}
          pageSizeOptions={[5, 10, 25]}
          enableSorting={true}
        />
      </Card>
    </Box>
  )
}

export default BranchManagementSection
